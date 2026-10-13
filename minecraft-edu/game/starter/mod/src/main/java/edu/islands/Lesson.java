package edu.islands;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.neoforged.fml.loading.FMLPaths;

/** Which lesson to open. The hub's Play button writes the number into <game folder>/islands/lesson.txt. */
public final class Lesson {
    private Lesson() {}

    static final String WORLD_PREFIX = "islands_lesson_";
    private static final Pattern WORLD_NAME = Pattern.compile("^" + WORLD_PREFIX + "(\\d{1,3})$");

    /** The lesson the hub asked for, or 0 when Minecraft was started some other way (then nothing happens). */
    static int requested() {
        Path file = FMLPaths.GAMEDIR.get().resolve("islands").resolve("lesson.txt");
        try {
            String text = Files.readString(file, StandardCharsets.UTF_8).trim();
            int n = Integer.parseInt(text);
            return n > 0 && n < 1000 ? n : 0;
        } catch (Exception e) {
            return 0;
        }
    }

    static String worldName(int lesson) {
        return WORLD_PREFIX + lesson;
    }

    /** The lesson number of a world we created, or 0 for any other world. */
    static int fromWorldName(String name) {
        Matcher m = WORLD_NAME.matcher(name == null ? "" : name);
        return m.matches() ? Integer.parseInt(m.group(1)) : 0;
    }
}
