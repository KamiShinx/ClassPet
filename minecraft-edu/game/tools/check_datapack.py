#!/usr/bin/env python3
"""Checks our datapack against the real Minecraft 26.2 command tree and registries, without running the game.

The cloud box can't run Minecraft, so this is the first test every function file goes through:
  - each line of every .mcfunction is walked through the 26.2 command tree (from misode/mcmeta, the game's own export);
  - block, item, entity and biome ids are checked against the 26.2 registries;
  - dialog files get a shape check (type, required fields, input keys used by dynamic commands).
It is strict on command names, literals and ids, and lenient on the inside of NBT, selectors and text components.

Usage: python3 check_datapack.py <path to the mod's resources/data folder>
Exit code 0 = no errors.
"""
import json
import os
import re
import sys
import urllib.request

VERSION = "26.2"
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".mcmeta-cache")
SOURCES = {
    "commands.json": f"https://raw.githubusercontent.com/misode/mcmeta/{VERSION}-summary/commands/data.json",
    "registries.json": f"https://raw.githubusercontent.com/misode/mcmeta/{VERSION}-summary/registries/data.min.json",
}


def load(name):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        urllib.request.urlretrieve(SOURCES[name], path)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


TREE = load("commands.json")
REG = load("registries.json")
OWN = {}  # ids our own datapack defines: registry -> set("ns:path")
OWN_NS = set()  # namespaces our datapack owns: an unknown id there is an error


def reg_has(registry, rid, tag=False):
    rid = rid if ":" in rid else "minecraft:" + rid
    ns, path = rid.split(":", 1)
    key = ("tag/" + registry) if tag else registry
    if rid in OWN.get(key, set()):
        return True
    if ns in OWN_NS:
        return False
    if ns != "minecraft":
        return None  # someone else's id: can't check
    return path in REG.get(key, [])


class Fail(Exception):
    pass


# ---------------- reading arguments from the line ----------------

def skip_balanced(s, i):
    """From s[i] in ([{" or ', return the index just past the matching close."""
    pairs = {"[": "]", "{": "}", "(": ")"}
    stack = []
    q = None
    j = i
    while j < len(s):
        c = s[j]
        if q:
            if c == "\\":
                j += 2
                continue
            if c == q:
                q = None
                if not stack:
                    return j + 1
        elif c in "\"'":
            q = c
        elif c in pairs:
            stack.append(pairs[c])
        elif stack and c == stack[-1]:
            stack.pop()
            if not stack:
                return j + 1
        j += 1
    raise Fail("unclosed bracket or quote")


def read_word(s, i):
    j = i
    while j < len(s) and s[j] != " ":
        j += 1
    if j == i:
        raise Fail("expected a value")
    return s[i:j], j


def read_compound_word(s, i):
    """A value that may contain [..] {..} "..": read until a space at depth 0."""
    j = i
    while j < len(s) and s[j] != " ":
        if s[j] in "[{(\"'":
            j = skip_balanced(s, j)
        else:
            j += 1
    if j == i:
        raise Fail("expected a value")
    return s[i:j], j


NUM = re.compile(r"^-?(\d+\.?\d*|\.\d+)$")
COORD = re.compile(r"^([~^]-?(\d+\.?\d*|\.\d+)?|-?(\d+\.?\d*|\.\d+))$")
ID = re.compile(r"^#?([a-z0-9_.-]+:)?[a-z0-9_./-]+$")


def coords(s, i, n, integer=False):
    vals = []
    for k in range(n):
        if k:
            if i >= len(s) or s[i] != " ":
                raise Fail("expected %d coordinates" % n)
            i += 1
        w, i = read_word(s, i)
        if not COORD.match(w):
            raise Fail("bad coordinate %r" % w)
        vals.append(w)
    if any(v.startswith("^") for v in vals) and not all(v.startswith("^") for v in vals):
        raise Fail("can't mix ^ with other coordinates")
    return i


def check_id(registry, rid, allow_tag, what):
    tag = rid.startswith("#")
    if tag and not allow_tag:
        raise Fail("%s can't be a tag here: %s" % (what, rid))
    ok = reg_has(registry, rid[1:] if tag else rid, tag)
    if ok is False:
        raise Fail("unknown %s%s: %s" % ("tag of " if tag else "", what, rid))


def read_id_with_state(s, i, registry, what, allow_tag):
    j = i
    while j < len(s) and s[j] not in " [{":
        j += 1
    rid = s[i:j]
    if not ID.match(rid):
        raise Fail("bad %s id %r" % (what, rid))
    check_id(registry, rid, allow_tag, what)
    for opener in "[{":
        if j < len(s) and s[j] == opener:
            j = skip_balanced(s, j)
    return j


def parse_arg(parser, props, s, i):
    """Returns the new index. Raises Fail."""
    if parser == "brigadier:bool":
        w, j = read_word(s, i)
        if w not in ("true", "false"):
            raise Fail("expected true/false, got %r" % w)
        return j
    if parser in ("brigadier:integer", "brigadier:float", "brigadier:double"):
        w, j = read_word(s, i)
        if not NUM.match(w) or (parser == "brigadier:integer" and "." in w):
            raise Fail("expected a number, got %r" % w)
        v = float(w)
        if "min" in props and v < props["min"] or "max" in props and v > props["max"]:
            raise Fail("number %s out of range" % w)
        return j
    if parser == "brigadier:string":
        t = props.get("type")
        if t == "greedy":
            return len(s)
        if t == "phrase" and i < len(s) and s[i] in "\"'":
            return skip_balanced(s, i)
        return read_word(s, i)[1]
    if parser in ("minecraft:message",):
        return len(s)
    if parser == "minecraft:block_pos":
        return coords(s, i, 3)
    if parser == "minecraft:vec3":
        return coords(s, i, 3)
    if parser in ("minecraft:vec2", "minecraft:rotation", "minecraft:column_pos"):
        return coords(s, i, 2)
    if parser == "minecraft:entity":
        if s.startswith("@", i):
            if i + 1 >= len(s) or s[i + 1] not in "parsen":
                raise Fail("bad selector")
            j = i + 2
            if j < len(s) and s[j] == "[":
                j = skip_balanced(s, j)
            if props.get("amount") == "single" and s[i + 1] in "ae" and "limit=1" not in s[i:j]:
                raise Fail("this needs ONE entity: add limit=1 or use @s/@p/@n")
            if props.get("type") == "players" and s[i + 1] == "e" and "type=minecraft:player" not in s[i:j] and "type=player" not in s[i:j]:
                raise Fail("this needs players, not @e")
            return j
        return read_word(s, i)[1]
    if parser in ("minecraft:score_holder",):
        if s.startswith("@", i):
            return parse_arg("minecraft:entity", {}, s, i)
        return read_word(s, i)[1]
    if parser == "minecraft:block_state":
        return read_id_with_state(s, i, "block", "block", False)
    if parser == "minecraft:block_predicate":
        return read_id_with_state(s, i, "block", "block", True)
    if parser == "minecraft:item_stack":
        return read_id_with_state(s, i, "item", "item", False)
    if parser == "minecraft:item_predicate":
        if s.startswith("*", i):
            j = i + 1
            if j < len(s) and s[j] == "[":
                j = skip_balanced(s, j)
            return j
        return read_id_with_state(s, i, "item", "item", True)
    if parser in ("minecraft:resource", "minecraft:resource_key", "minecraft:resource_or_tag", "minecraft:resource_or_tag_key"):
        w, j = read_word(s, i)
        reg = props["registry"].split(":", 1)[1]
        check_id(reg, w, "tag" in parser, reg)
        return j
    if parser == "minecraft:function":
        w, j = read_word(s, i)
        if not w.startswith("#"):
            ok = reg_has("function", w)
            if ok is False:
                raise Fail("unknown function " + w)
        return j
    if parser == "minecraft:dialog":
        if s.startswith("{", i):
            return skip_balanced(s, i)
        w, j = read_word(s, i)
        if reg_has("dialog", w) is False:
            raise Fail("unknown dialog " + w)
        return j
    if parser == "minecraft:time":
        w, j = read_word(s, i)
        if not re.match(r"^\d+(\.\d+)?[dst]?$", w):
            raise Fail("bad time %r" % w)
        return j
    if parser == "minecraft:objective":
        w, j = read_word(s, i)
        if len(w) > 64 or not re.match(r"^[A-Za-z0-9_.+-]+$", w):
            raise Fail("bad objective name %r" % w)
        return j
    if parser in ("minecraft:component", "minecraft:nbt_compound_tag", "minecraft:nbt_tag", "minecraft:style",
                  "minecraft:particle", "minecraft:nbt_path", "minecraft:loot_predicate", "minecraft:loot_modifier",
                  "minecraft:loot_table"):
        if i < len(s) and s[i] in "[{\"'":
            j = skip_balanced(s, i)
            if parser == "minecraft:nbt_path":
                return read_compound_word(s, i)[1]
            return j
        if parser == "minecraft:nbt_compound_tag":
            raise Fail("expected {…}")
        return read_compound_word(s, i)[1]
    # everything else: one word (objective criteria, team, gamemode, slots, ranges, anchors, uuid, colours…)
    w, j = read_compound_word(s, i)
    if parser == "minecraft:gamemode" and w not in ("survival", "creative", "adventure", "spectator"):
        raise Fail("bad gamemode %r" % w)
    if parser == "minecraft:entity_anchor" and w not in ("eyes", "feet"):
        raise Fail("bad anchor %r" % w)
    return j


# ---------------- walking the tree ----------------

def node_at(path):
    n = TREE
    for p in path:
        n = n["children"][p]
    return n


def walk(node, s, i, depth=0):
    """True if s[i:] completes a valid command from this node. Collects the best error in ERR."""
    if depth > 200:
        raise Fail("too deep")
    while i < len(s) and s[i] == " " and False:
        i += 1
    if i >= len(s):
        if node.get("executable"):
            return True
        record(i, "the command is not finished")
        return False
    if s[i] != " " and node is not TREE:
        record(i, "expected a space")
        return False
    if node is not TREE:
        i += 1
    children = node.get("children")
    if "redirect" in node:
        children = node_at(node["redirect"]).get("children")
    elif children is None and node.get("type") == "literal" and not node.get("executable"):
        children = TREE["children"]  # `execute run` goes back to the root
    if not children:
        record(i, "too many arguments")
        return False
    word = s[i:].split(" ", 1)[0]
    for name, child in children.items():
        if child["type"] == "literal" and name == word:
            if walk(child, s, i + len(word), depth + 1):
                return True
    for name, child in children.items():
        if child["type"] == "argument":
            try:
                j = parse_arg(child["parser"], child.get("properties", {}), s, i)
            except Fail as e:
                record(i, "%s: %s" % (name, e))
                continue
            if walk(child, s, j, depth + 1):
                return True
    if not any(c["type"] == "argument" for c in children.values()):
        record(i, "unknown word %r" % word)
    return False


ERR = {"pos": -1, "msg": ""}


def record(pos, msg):
    if pos >= ERR["pos"]:
        ERR["pos"], ERR["msg"] = pos, msg


def check_command(cmd):
    ERR["pos"], ERR["msg"] = -1, ""
    if walk(TREE, cmd, 0):
        return None
    return "at col %d: %s" % (ERR["pos"] + 1, ERR["msg"])


# ---------------- files ----------------

def scan_own(data):
    for ns in os.listdir(data):
        if ns != "minecraft":
            OWN_NS.add(ns)
        base = os.path.join(data, ns)
        for kind, reg in (("function", "function"), ("dialog", "dialog"), ("advancement", "advancement"),
                          ("predicate", "predicate"), ("loot_table", "loot_table"), ("tags/function", "tag/function")):
            root = os.path.join(base, kind)
            if not os.path.isdir(root):
                continue
            for dp, _, files in os.walk(root):
                for f in files:
                    rel = os.path.relpath(os.path.join(dp, f), root).replace(os.sep, "/")
                    rid = "%s:%s" % (ns, rel.rsplit(".", 1)[0])
                    OWN.setdefault(reg, set()).add(rid)


def check_dialog(path, obj, errors):
    t = obj.get("type", "").replace("minecraft:", "")
    if t not in REG["dialog_type"]:
        errors.append("%s: unknown dialog type %r" % (path, t))
        return
    if "title" not in obj:
        errors.append("%s: missing title" % path)
    keys = set()
    for inp in obj.get("inputs", []):
        it = inp.get("type", "").replace("minecraft:", "")
        if it not in REG["input_control_type"]:
            errors.append("%s: unknown input type %r" % (path, it))
        if not re.match(r"^[A-Za-z0-9_]+$", inp.get("key", "")):
            errors.append("%s: bad input key %r" % (path, inp.get("key")))
        keys.add(inp.get("key"))
        if it == "number_range":
            for f in ("label", "start", "end"):
                if f not in inp:
                    errors.append("%s: slider %s needs %s" % (path, inp.get("key"), f))
        elif "label" not in inp:
            errors.append("%s: input %s needs a label" % (path, inp.get("key")))
    buttons = list(obj.get("actions", []))
    for k in ("action", "yes", "no", "exit_action"):
        if isinstance(obj.get(k), dict):
            buttons.append(obj[k])
    if t == "multi_action" and not obj.get("actions"):
        errors.append("%s: multi_action needs actions" % path)
    if t == "confirmation" and not ("yes" in obj and "no" in obj):
        errors.append("%s: confirmation needs yes and no" % path)
    for b in buttons:
        if "label" not in b:
            errors.append("%s: a button has no label" % path)
        a = b.get("action")
        if not a:
            continue
        at = a.get("type", "").replace("minecraft:", "")
        if at not in REG["dialog_action_type"]:
            errors.append("%s: unknown action type %r" % (path, at))
        if at == "run_command":
            e = check_command(a.get("command", "").lstrip("/"))
            if e:
                errors.append("%s: button command %r %s" % (path, a.get("command"), e))
        if at == "dynamic/run_command":
            tpl = a.get("template", "")
            used = set(re.findall(r"\$\((\w+)\)", tpl))
            if used - keys:
                errors.append("%s: template uses %s but the dialog has no such input" % (path, used - keys))
            if not used:   # the game refuses this at load time: "No variables in macro" (found on Windows, 13 Oct)
                errors.append("%s: dynamic/run_command template %r has no $(variable); use run_command with \"command\"" % (path, tpl))
            sample = re.sub(r"\$\((\w+)\)", "1", tpl)
            e = check_command(sample.lstrip("/"))
            if e:
                errors.append("%s: template %r %s" % (path, tpl, e))
        if at == "show_dialog":
            d = a.get("dialog")
            if isinstance(d, str) and reg_has("dialog", d) is False:
                errors.append("%s: shows unknown dialog %s" % (path, d))


def main(data):
    scan_own(data)
    errors = []
    lines = 0
    for dp, _, files in os.walk(data):
        for f in sorted(files):
            p = os.path.join(dp, f)
            rel = os.path.relpath(p, data)
            if f.endswith(".mcfunction"):
                with open(p, encoding="utf-8") as fh:
                    for n, line in enumerate(fh, 1):
                        line = line.rstrip("\n").rstrip("\r")
                        st = line.strip()
                        if not st or st.startswith("#"):
                            continue
                        lines += 1
                        if st.startswith("$"):
                            # a macro line: put a sample value where each $(name) stands (an id where the name says so)
                            st = re.sub(r"\$\((\w+)\)", lambda m: "minecraft:stone" if m.group(1) in ("id", "item", "block") else "1", st[1:])
                        e = check_command(st)
                        if e:
                            errors.append("%s:%d %s\n    %s" % (rel, n, e, st[:160]))
            elif f.endswith(".json"):
                try:
                    with open(p, encoding="utf-8") as fh:
                        obj = json.load(fh)
                except Exception as e:
                    errors.append("%s: bad JSON: %s" % (rel, e))
                    continue
                if "/dialog/" in "/" + rel.replace(os.sep, "/"):
                    check_dialog(rel, obj, errors)
    for e in errors:
        print("ERROR", e)
    print("%d command lines checked, %d errors" % (lines, len(errors)))
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))
