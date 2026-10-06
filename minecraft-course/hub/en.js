/* English for the kids' page, for kids who find Hebrew hard. The Hebrew in content.js and index.html stays the source;
   this file swaps the words on screen: whole lesson steps for the open lessons, a dictionary for buttons and labels,
   and patterns for the messages the buttons send back. Loaded by index.html after content.js. */
(function(){
"use strict";
const H = window.HUB, LS = H.LS, esc = H.esc;

/* ---------- buttons, labels, messages: exact Hebrew text -> English ---------- */
const D = {
  // home and lesson player
  "מודים למיינקראפט":"Minecraft Mods", "העולם שלכם, קובייה אחרי קובייה · 20 שיעורים · MAKE":"Your world, block by block · 20 lessons · MAKE",
  "מחשב מספר":"Computer number", "אותיות גדולות":"Big letters", "ההתקדמות שלכם":"Your progress", "בקרוב":"Soon", "הושלם":"Done",
  "→ לקורס":"← Course", "→ חזרה":"← Back", "הבא ←":"Next →", "סיימתי ←":"I'm done →", "אפשר גם עם החצים במקלדת":"You can also use the arrow keys",
  "רמז":"Hint", "נתקעתי":"I'm stuck", "למה?":"Why?", "מה אמור לקרות":"What should happen", "שימו לב":"Note",
  "אתגרי השיעור":"Lesson challenges", "מסמנים מה שסיימתם. זה נשמר על המחשב הזה.":"Tick what you finished. It's saved on this computer.",
  "חובה":"must", "אתגר":"challenge", "העתקה":"Copy", "הועתק":"Copied", "כותבים בג׳מיני:":"Write in Gemini:",
  "נשמר על המחשב הזה":"Saved on this computer",
  // the dock
  "הדבקה מג׳מיני ושחק":"Paste from Gemini & play", "להעתיק לג׳מיני":"Copy for Gemini", "שחק":"Play", "ביטול ההדבקה":"Undo paste",
  "גרסאות":"Versions", "תמונות":"Pictures", "דרייב":"Drive", "נעילה":"Lock",
  "גרסאות שמורות":"Saved versions", "לשמור גרסה עכשיו":"Save a version now", "להחזיר":"Bring back", "עדיין אין גרסאות שמורות.":"No saved versions yet.",
  "לפני כל הדבקה המחשב שומר גרסה לבד. ״להחזיר״ מחזיר את הקוד והתמונות למה שהיה אז, ואפשר להתחרט גם על זה.":"Before every paste the computer saves a version by itself. \"Bring back\" returns the code and pictures to how they were then, and you can undo that too.",
  "היום":"today", "גרסה ששמרתם":"a version you saved", "לפני שהחזרתם גרסה":"before you brought back a version",
  "העולם שלכם בדרייב":"Your world in Drive",
  "המחשב של בית הספר יכול להתאפס, ובשבוע הבא אולי תקבלו מחשב אחר. לכן בסוף כל שיעור שומרים את העולם בדרייב שלכם.":"School computers can be reset, and next week you may get a different one. So at the end of every lesson, save your world in your Drive.",
  "בסוף השיעור: שומרים":"End of the lesson: save", "במחשב חדש: מחזירים":"On a new computer: bring it back",
  "להוריד את קובץ הגיבוי":"Download the backup file", "לבחור את הקובץ ולהחזיר":"Choose the file and bring it back",
  "השגיאה כבר הועתקה.":"The error is already copied.", "עוברים לג׳מיני":"Go to Gemini", "להעתיק שוב":"Copy again", "לוחצים":"Press",
  "ג׳מיני לא עובד? בונים בלי ג׳מיני":"Gemini not working? Build without Gemini",
  "המחשב בונה את החפץ ישר מהכרטיס: השם, המשפט, הציור וכמה בערימה.":"The computer builds the item straight from your card: name, line, picture and stack size.",
  // messages from the buttons
  "מוכן.":"Ready.", "מוכן. אפשר ללחוץ שוב על שחק.":"Ready. You can press Play again.",
  "המחשב בונה את המוד ופותח את מיינקראפט. זה לוקח דקה או שתיים...":"The computer is building your mod and opening Minecraft. It takes a minute or two...",
  "המחשב בונה ופותח את מיינקראפט...":"The computer is building and opening Minecraft...",
  "מיינקראפט פתוח. כשסוגרים אותו, אפשר להדביק שוב.":"Minecraft is open. When you close it, you can paste again.",
  "משהו לא עבד. השגיאה הועתקה.":"Something didn't work. The error is copied.",
  "קודם סוגרים את מיינקראפט.":"First close Minecraft.", "מיינקראפט כבר פתוח.":"Minecraft is already open.", "תיקיית התמונות נפתחה.":"The pictures folder is open.",
  "הועתקו החוקים והקוד שלכם. בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים.":"Your rules and code are copied. In Gemini press Ctrl + V, and below it write what you want.",
  "השגיאה הועתקה שוב.":"The error is copied again.", "הגרסה נשמרה.":"Version saved.", "הגרסה חזרה. לוחצים שחק כדי לבדוק.":"The version is back. Press Play to check.",
  "הגרסה לא נמצאה.":"Version not found.", "אין מה לבטל.":"Nothing to undo.", "הציור לא נשמר. נסו שוב.":"The picture wasn't saved. Try again.",
  "המחשב מכין את קובץ הגיבוי...":"The computer is making the backup file...", "המחשב מחזיר את העולם שלכם...":"The computer is bringing your world back...",
  "קובץ הגיבוי ירד לתיקיית ההורדות. עכשיו מעלים אותו לדרייב.":"The backup file is in your Downloads folder. Now upload it to Drive.",
  "העולם שלכם חזר: הקוד, הציורים והעולמות. לוחצים שחק.":"Your world is back: code, pictures and worlds. Press Play.",
  "הקובץ לא נקרא. מורידים אותו שוב מהדרייב ומנסים שוב.":"The file couldn't be read. Download it again from Drive and try again.",
  "זה לא קובץ גיבוי של הקורס. בוחרים את הקובץ שמתחיל ב־myworld.":"That's not a course backup file. Choose the file that starts with myworld.",
  "עוד לא העתקתם כלום. בג׳מיני לוחצים על כפתור ההעתקה שליד הקוד.":"You haven't copied anything yet. In Gemini, press the copy button next to the code.",
  "הקוד נחתך באמצע. בקשו מג׳מיני: ״שלח שוב את כל הקובץ״.":"The code was cut off. Ask Gemini: \"send the whole file again\".",
  "מה שהעתקתם זה לא קוד של המוד. בקשו מג׳מיני: ״שלח את כל הקובץ״.":"What you copied isn't mod code. Ask Gemini: \"send the whole file\".",
  "הכרטיס לא נקרא. נסו שוב.":"The card couldn't be read. Try again.", "חסר שם לחפץ. כותבים אותו בכרטיס.":"The item has no name. Write it on the card.",
  "הקוד באנגלית: רק אותיות קטנות, מספרים וקו תחתון, ומתחיל באות. למשל honey_coin.":"The English code: only small letters, numbers and _, starting with a letter. For example honey_coin.",
  "הכפתורים לא עובדים כרגע. לוחצים על Minecraft בתפריט Start.":"The buttons don't work right now. Click Minecraft in the Start menu.",
  // the code lock
  "קוד לעולם שלכם":"A code for your world", "בוחרים 4 ספרות שרק אתם יודעים. בכל פעם שפותחים את הדף, מקלידים אותן.":"Choose 4 digits only you know. Type them every time you open this page.",
  "שוב, לבדיקה":"Again, to check", "מקלידים את אותן 4 ספרות עוד פעם.":"Type the same 4 digits once more.",
  "העולם שלכם נעול":"Your world is locked", "מקלידים את הקוד שלכם.":"Type your code.",
  "קוד המורה":"Teacher's code", "המורה מקליד את הקוד שלו, ואז בוחרים קוד חדש.":"The teacher types their code, then you choose a new one.",
  "שכחתי את הקוד":"I forgot my code", "ביטול":"Cancel", "הקודים לא זהים. מתחילים מחדש.":"The codes don't match. Start again.",
  "הקוד לא נכון. נסו שוב.":"Wrong code. Try again.", "זה לא קוד המורה.":"That's not the teacher's code.",
  // the item card
  "כרטיס החפץ":"Item card", "שיעור 2":"Lesson 2", "שם החפץ במשחק":"The item's name in the game", "בשביל מה הוא?":"What is it for?",
  "המחיר שלו":"Its price", "איפה משיגים אותו?":"Where do you get it?", "הקוד באנגלית (אותיות קטנות, בלי רווחים)":"The English code (small letters, no spaces)",
  "המשפט שמופיע מתחת לשם":"The line under the name", "כמה נכנסים בערימה אחת (1 עד 64)":"How many fit in one stack (1 to 64)",
  "למשל: מטבע דבש":"e.g. Honey Coin", "למשל: משלמים בו לדבורים, והן פותחות את השער לעיר":"e.g. You pay the bees with it, and they open the city gate",
  "למשל: מי שמחזיק מטבע, הדבורים רודפות אחריו":"e.g. Whoever holds a coin gets chased by bees", "למשל: רק בכוורות ישנות, אחד בכל כוורת":"e.g. Only in old hives, one per hive",
  "למשל: honey_coin":"e.g. honey_coin", "למשל: הדבורים מקבלות רק אותו.":"e.g. The bees only take this.", "למשל: 16":"e.g. 16",
  // the pixel editor
  "הקוד של החפץ:":"Item code:", "עיפרון":"Pencil", "מחק":"Eraser", "דלי":"Bucket", "צעד אחורה":"Step back", "לנקות הכול":"Clear all",
  "ככה זה ייראה במשחק":"This is how it looks in the game", "לשמור את הציור":"Save the picture",
  "קודם כותבים את הקוד של החפץ, באנגלית.":"First write the item's code, in English.", "הלוח ריק. קודם מציירים.":"The board is empty. Draw first.",
  "כדי לשמור, פותחים את הדף מהסמל Minecraft בשולחן העבודה.":"To save, open this page from the Minecraft icon.",
  // home timeline
  "מתחילים":"Getting started", "מיינקראפט עובד, העולם שלי על נייר":"Minecraft works, my world on paper", "התקנה והעולם שלי":"Install and my world",
  "החפצים הראשונים":"The first items", "מהכרטיס אל תוך המשחק":"From the card into the game", "החפץ הראשון שלי":"My first item",
  "חפץ בתלת־ממד":"A 3D item", "חפץ עם מחיר":"An item with a price", "אפקט שמשנה את המשחק":"An effect that changes the game",
  "המקום והיצור הראשון":"The place and the first creature", "עולם שיש בו חוקים":"A world with rules", "המקום שלי":"My place", "חוק של העולם":"A world rule",
  "היצור הראשון":"The first creature", "הכול מתחבר":"It all connects", "תערוכה 1":"Showcase 1", "כולם משחקים בעולם של כולם":"Everyone plays everyone's world",
  "יצור החתימה":"The signature creature", "היצור שרק אתם יכולתם להמציא":"The creature only you could invent", "מעצבים יצור":"Designing a creature",
  "בונים לו מודל":"Building its model", "מכניסים למשחק":"Into the game", "איך הוא נלחם":"How it fights", "שביל הסיפור":"The story path",
  "מסיימים ומראים":"Finishing and showing", "עולם שלם שאחרים משחקים בו":"A whole world others play", "הבחירה שלכם א׳":"Your choice A", "הבחירה שלכם ב׳":"Your choice B",
  "מסיימים":"Finishing", "חזרה גנרלית":"Dress rehearsal", "תערוכה 2":"Showcase 2",
  // the studio
  "הסטודיו":"Studio", "העולם שלכם, בלי קוד":"Your world, no code", "כאן בונים את העולם שלכם: חפצים, ובקרוב גם יצורים, חוקים ומקומות.":"This is where you build your world: items, and soon creatures, rules and places.",
  "שם העולם שלכם":"Your world's name", "למשל: עיר הדבורים":"e.g. Bee City", "מופיע במשחק, בלשונית של מצב יצירה.":"Shown in the game, on the Creative tab.",
  "חפצים":"Items", "יצורים":"Creatures", "חוקים":"Rules", "מקומות":"Places", "החפצים שלי":"My items", "+ חפץ חדש":"+ New item", "מכרטיס החפץ שכתבתם":"From your item card",
  "עוד אין חפצים":"No items yet", "לוחצים על ״חפץ חדש״, וממציאים את החפץ הראשון של העולם שלכם.":"Press \"New item\" and invent your world's first item.", "בלי שם":"No name",
  "הציור, 16 על 16":"The picture, 16 by 16", "לנקות":"Clear", "לחיצה ימנית מוחקת. קו מתאר כהה, ושניים עד ארבעה צבעים.":"Right-click erases. A dark outline, and two to four colours.",
  "השם במשחק":"Name in the game", "הקוד באנגלית":"English code", "אותיות קטנות, בלי רווחים. ככה המשחק מכיר את החפץ.":"Small letters, no spaces. This is how the game knows the item.",
  "כמה בערימה":"Stack size", "כמה נדיר":"How rare", "רגיל":"Common", "לא נפוץ":"Uncommon", "נדיר":"Rare", "אגדי":"Epic",
  "בשביל מה, המחיר, ואיפה משיגים":"What it's for, its price, and where you get it", "נכנס למשחק בשיעור הבא":"goes into the game next lesson",
  "מה החפץ עושה?":"What does the item do?", "בשבוע הבא: בונים לו כוח, עם קוביות של חוקים.":"Next week: you build it a power, with rule blocks.",
  "לשחק עם השינויים":"Play with the changes", "למחוק את החפץ":"Delete the item", "ג׳מיני, שותף לעיצוב":"Gemini, your design partner",
  "הדבקה מג׳מיני":"Paste from Gemini", "ג׳מיני מציע:":"Gemini suggests:", "לקבל":"Accept", "לא, תודה":"No, thanks", "חפץ חדש: ":"New item: ",
  "קוד":"code", "שם":"name", "משפט":"line", "בערימה":"stack", "נדירות":"rarity", "בשביל מה":"what for", "מחיר":"price", "איפה משיגים":"where",
  "שומר...":"Saving...", "נשמר":"Saved", "נשמר.":"Saved.", "השינוי נכנס לעיצוב.":"The change is in your design.", "טוען...":"Loading...",
  "הועתק. בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים.":"Copied. In Gemini press Ctrl + V, and below it write what you want.",
  "ככה זה ייראה במשחק":"This is how it looks in the game", "למשל: הדבורים מקבלות רק אותו.":"e.g. The bees only take this.",
  "עוד לא העתקתם את התשובה של ג׳מיני. בג׳מיני לוחצים על כפתור ההעתקה שמתחת לתשובה.":"You haven't copied Gemini's answer yet. In Gemini, press the copy button under the answer.",
  "בתשובה של ג׳מיני אין שינוי לעיצוב. אם רציתם שינוי, כתבו לו: ״תשלח את השינוי בבלוק studio״.":"Gemini's answer has no change for your design. If you wanted one, write to it: \"send the change as a studio block\".",
  "ג׳מיני שלח שינוי שבור. כתבו לו: ״הבלוק שלך לא תקין, תשלח אותו שוב״.":"Gemini sent a broken change. Write to it: \"your block is broken, send it again\".",
  "ג׳מיני לא שלח שום שינוי שהסטודיו מכיר.":"Gemini didn't send any change the studio knows.",
  "ובג׳מיני לוחצים":"and in Gemini press", ". מתחת כותבים מה אתם רוצים: רעיון, שאלה, או שינוי.":". Below it, write what you want: an idea, a question, or a change.",
  "ג׳מיני הציע שינוי? מעתיקים את כל התשובה שלו, ולוחצים":"Gemini suggested a change? Copy its whole answer, and press",
  "יותר מדי חפצים: עד 60.":"Too many items: up to 60.", "השם ארוך מדי: עד 40 אותיות.":"The name is too long: up to 40 letters.", "המשפט מתחת לשם ארוך מדי: עד 80 אותיות.":"The line is too long: up to 80 letters.",
  "הסטודיו, לפני שינוי":"the studio, before a change",
  "מה החפץ עושה?":"What does the item do?", "גוררים קוביות מהתפריט: קודם ״מתי״, ובתוכה מה קורה. אל תשכחו מחיר.":"Drag blocks from the menu: first a \"When\", and inside it what happens. Don't forget a price.",
  "במילים שלכם: מה החפץ אמור לעשות?":"In your own words: what should the item do?", "להעתיק את הקוביות לג׳מיני":"Copy the blocks for Gemini",
  "ג׳מיני יבדוק אם הקוביות עושות את מה שכתבתם, יסביר מה לא עובד, ויציע גרסה מתוקנת. אתם מחליטים אם לקחת אותה.":"Gemini checks whether the blocks do what you wrote, explains what doesn't work, and suggests a fixed version. You decide whether to take it.",
  "למשל: כשמכים יצור בלילה, נופל עליו ברק. אחרי זה המקל צריך לנוח.":"e.g. When I hit a creature at night, lightning strikes it. Then the stick needs to rest.",
  "ג׳מיני מציע גרסה משופרת לקוביות:":"Gemini suggests a better version of your blocks:", "עכשיו":"Now", "אחרי":"After",
  "עוד אין קוביות. קודם בונים, אחר כך משפרים עם ג׳מיני.":"No blocks yet. Build first, then improve with Gemini.",
  "הקוביות הועתקו. בג׳מיני לוחצים Ctrl + V ושולחים. אחר כך מעתיקים את כל התשובה ולוחצים ״הדבקה מג׳מיני״.":"The blocks are copied. In Gemini press Ctrl + V and send. Then copy the whole answer and press \"Paste from Gemini\".",
  "הקוביות של ג׳מיני נכנסו. אפשר לשנות אותן, ולהחזיר ב״גרסאות״.":"Gemini's blocks are in. You can change them, or bring back the old ones in Versions.",
  "ג׳מיני השתמש ביצור שאין בסטודיו.":"Gemini used a creature the studio doesn't have.", "ג׳מיני השתמש באפקט שאין בסטודיו.":"Gemini used an effect the studio doesn't have.",
  "ג׳מיני השתמש בצליל שאין בסטודיו.":"Gemini used a sound the studio doesn't have.", "ג׳מיני המציא קובייה שלא קיימת.":"Gemini invented a block that doesn't exist.",
  "ג׳מיני שלח קוביות שבורות. כתבו לו: ״הבלוק שלך לא תקין, תשלח אותו שוב״.":"Gemini sent broken blocks. Write to it: \"your block is broken, send it again\".", "הקוד באנגלית מתחיל באות.":"The English code starts with a letter.",
  "כרטיס העולם, ומיינקראפט שעובד על המחשב":"World card, and Minecraft working on the computer", "חפץ עם שם, ציור והסבר שלכם, בתוך המשחק":"An item with your name, picture and line, in the game",
  "מודל ב־Blockbench שמחזיקים ביד":"A Blockbench model you hold in your hand", "חפץ חזק שיש לו חיסרון":"A strong item with a downside", "אוכל או שיקוי עם אפקט חדש":"Food or a potion with a new effect",
  "מקום בעולם, עם תיבת אוצר":"A place in the world, with a treasure chest", "חוק ״כש... אם... אז...״ שעובד במשחק":"A \"when... if... then...\" rule that works in the game",
  "יצור עם סימן אזהרה לפני שהוא תוקף":"A creature with a warning sign before it attacks", "יצור שחי במקום שלכם ומפיל חפץ שלכם":"A creature that lives in your place and drops your item",
  "כולם משחקים בעולמות של כולם":"Everyone plays everyone's worlds", "צללית, תכונה אחת, 2–4 צבעים":"A silhouette, one trait, 2–4 colours", "מודל וציור ב־Blockbench":"A model and picture in Blockbench",
  "היצור שלכם זז בתוך העולם":"Your creature moves in the world", "אפשר לנצח אותו, אבל לא בניסיון הראשון":"It can be beaten, but not on the first try",
  "הישגים שמובילים את השחקן בעולם":"Achievements that lead the player through the world", "יצור שני, חוק שני, או בוס":"A second creature, a second rule, or a boss",
  "ממשיכים את מה שבחרתם":"Keep going with what you chose", "שום דבר חדש, רק תיקונים":"Nothing new, only fixes",
  "שותף משחק בעולם שלכם, ואתם מתקנים מה שלא עבד":"A partner plays your world, and you fix what didn't work", "המשפחות מגיעות ומשחקות בעולם שלכם":"Families come and play your world"
};
const RX = [
  [/^(\d+) שלבים$/, "$1 steps"], [/^שיעור (\d+)$/, "Lesson $1"], [/^שלב (\d+) \/ (\d+)$/, "Step $1 / $2"], [/^(\d+) מתוך (\d+) שיעורים$/, "$1 of $2 lessons"],
  [/^רמז (\d+)$/, "Hint $1"], [/^בונים: (.*)$/, k => "Build: " + (D[k.slice(7)] || k.slice(7))], [/^לפני הדבקה ל־(\w+)$/, "before pasting into $1"],
  [/^הקוד נכנס לקובץ (\w+\.java)$/, "The code went into $1"], [/^(.*)\. המחשב בונה ופותח את מיינקראפט\.\.\.$/, s => tr(s.replace(/\. המחשב בונה ופותח את מיינקראפט\.\.\.$/, "")) + ". The computer is building and opening Minecraft..."],
  [/^ג׳מיני שלח רק חפץ, אז הוספתי אותו לקובץ MyItems\.java: (.*)$/, "Gemini sent only an item, so it was added to MyItems.java: $1"],
  [/^החפץ (.*) נכנס לקובץ MyItems\.java, בלי ג׳מיני$/, "The item $1 went into MyItems.java, without Gemini"],
  [/^הציור נשמר בשם (.*)\. לוחצים שחק כדי לראות אותו במשחק\.$/, "The picture was saved as $1. Press Play to see it in the game."],
  [/^הקובץ (\S+) חזר למה שהיה לפני ההדבקה האחרונה\. לוחצים שחק כדי לבדוק\.$/, "$1 is back to how it was before the last paste. Press Play to check."],
  [/^נטען הציור הקיים של (.*)$/, "Loaded the existing picture of $1"], [/^יותר מדי ניסיונות\. מחכים (\d+) שניות\.$/, "Too many tries. Wait $1 seconds."],
  [/^כבר יש חפץ עם הקוד (\w+), שג׳מיני כתב בקובץ MyItems\.java\. בוחרים קוד אחר\.$/, "There's already an item with the code $1, which Gemini wrote in MyItems.java. Choose another code."],
  [/^יש שני חפצים עם הקוד (\w+)\.$/, "Two items have the code $1."],
  [/^ג׳מיני שלח קובץ בשם (\w+)\..*$/, "Gemini sent a file called $1. Your files are MyItems, MyEffects, MyMobs, MyRules, MyWorld. Ask it to put the code in one of them."]
];
function tr(t){
  const k = t.trim(); if (!k || !/[֐-׿]/.test(k)) return null;
  if (D[k] !== undefined) return t.replace(k, D[k]);
  for (const [re, to] of RX) if (re.test(k)) return t.replace(k, typeof to === "function" ? to(k) : k.replace(re, to));
  return null;
}

/* ---------- lesson steps: whole English versions for the open lessons ---------- */
const EN_L = {
  2: { unit:"Unit 2 · The first items", title:"Lesson 2: My first item", steps:[
    { type:"Start", title:"What we do today",
      body:`<p>Today your first item goes into the game, with a name, a line and a picture you chose.</p>`,
      expect:"By the end of the lesson your item is in the game, in the Creative menu, with the picture you drew.",
      note:"Your world card is gone? The computer was probably reset, or it's a different computer. Press <b>Drive</b> at the top and bring your world back from Drive.",
      visual:()=>`<div class="today"><div><span class="num">1</span><b>What makes an item great?</b><span>We talk about it together.</span></div>
        <div><span class="num">2</span><b>Invent an item</b><span>A card and a 16 by 16 drawing, on paper.</span></div>
        <div><span class="num">3</span><b>Gemini writes the code</b><span>You paste and check.</span></div></div>` },
    { type:"Talk", title:"What makes an item great?",
      body:`<p>What's the best item in Minecraft? And which item do you never use?</p><p>A great item has four things. We talk about them together, then everyone invents an item for their world.</p>`,
      why:"A sword that kills everything in one hit is fun for five minutes. After that there's no danger, and no game. The price is the interesting part.",
      visual:()=>`<div class="today"><div><span class="num">1</span><b>What is it for?</b><span>With a Pickaxe you mine. What do you do with yours?</span></div>
        <div><span class="num">2</span><b>What's the price?</b><span>An Ender Pearl takes you far, and hurts you.</span></div>
        <div><span class="num">3</span><b>How rare is it?</b><span>Dirt: 64 in a stack. Totem of Undying: one.</span></div>
        <div><span class="num">4</span><b>Name and shape</b><span>Diamond Sword: you know what it does before you read.</span></div></div>` },
    { type:"Activity", title:"Item card",
      body:`<p>First on paper, with markers: the card, and a drawing of the item on the 16 by 16 grid.</p><p>Then copy the card here.</p>`,
      note:"Today the name, the line, the picture and the stack size go into the game. The power and the price come in lesson 4; until then they stay on the card.",
      hints:["An item from your world: what do you find there? What do you collect? What do people trade?","The line under the name can hint what the item is for, or what it costs.","The English code is also the picture's name. For example sky_shell or honey_coin: small letters, no spaces."] },
    { type:"Activity", title:"Draw the item",
      body:`<ol><li>Write the item's code at the top, like on the card.</li><li>Draw in the 16 by 16 square, like the drawing on your paper.</li><li>Press <b>Save the picture</b>.</li></ol>`,
      why:"In Minecraft every item is 16 by 16 squares. With so few squares, you decide what matters most in the shape.",
      hints:["Start with a dark outline, then fill it in.","Two to four colours are enough. One light colour gives shine.","Right-click erases."] },
    { type:"Talk", title:"This is how we build everything in the course",
      body:`<ol><li><b>Card:</b> decide what you want.</li><li><b>Gemini:</b> send it the rules, your code and the card.</li><li><b>Paste:</b> copy the code Gemini wrote, and press <b>Paste from Gemini & play</b> at the top.</li><li><b>Check:</b> in the game, check it's what you wanted.</li></ol>`,
      why:"Gemini only remembers what's in the chat. So every time you send it your code, and that way it doesn't delete what you already built.",
      visual:()=>`<div class="flow" dir="ltr"><div class="st"><b>Card</b><small>decide what you want</small></div><span class="ar">→</span><div class="st"><b>Gemini</b><small>rules, code and card</small></div><span class="ar">→</span><div class="st go"><b>Paste</b><small>Paste from Gemini & play</small></div><span class="ar">→</span><div class="st"><b>Check</b><small>is it what you wanted?</small></div></div>` },
    { type:"How to", title:"Open Gemini",
      body:`<ol><li>Go to <code>gemini.google.com</code> with your Ministry of Education account.</li><li>Open a new chat.</li><li>Put Gemini on one side of the screen and this page on the other.</li></ol>`,
      note:"To snap a window to a side: <kbd>Win</kbd> + right arrow, or <kbd>Win</kbd> + left arrow.",
      visual:()=>`<div class="split"><div>This page</div><div>Gemini</div></div>` },
    { type:"Activity", title:"Send it to Gemini",
      body:`<ol><li>Press <b>Copy for Gemini</b> at the top, and in Gemini press <kbd>Ctrl</kbd> + <kbd>V</kbd>.</li><li>Below it, paste the card from the box, and send.</li><li>Copy the file Gemini sends, and press <b>Paste from Gemini & play</b> at the top.</li></ol>`,
      note:"Gemini writes the code, but you invent the ideas. If it suggests a name or a line, tell it that part is yours.",
      visual:()=>{ const v = LS.get("itemcard", {}); const t = "A new item for my world.\nName: " + (v.name||"") + "\nCode: " + (v.code||"") + "\nLine under the name: " + (v.line||"") + "\nStack size: " + (v.stack||"");
        return H.gemPromptBox(t) + `<div class="nogem"><button class="btn ghost" data-nogem>Gemini not working? Build without Gemini</button><small>The computer builds the item straight from your card: name, line, picture and stack size.</small></div>`; } },
    { type:"Check", title:"Check it in the game",
      body:`<ol><li>Enter a world in Creative mode.</li><li>Press <kbd>E</kbd> and find your world's tab.</li><li>Check it against the card: the name, the line, the picture, and the stack size.</li></ol>`,
      expect:"Everything like on the card. And if something's different, that's exactly what you fix now.",
      stuck:[["There's a purple and black square instead of the picture","The picture's code isn't the same as the code on the card. Check both, letter by letter."],["The game didn't open and a yellow box appeared","The error is already copied. In Gemini press Ctrl + V, then Enter."]],
      visual:()=>`<div class="checks"><div><span class="ok"></span>The item's name, like on the card</div><div><span class="ok"></span>The line under the name</div><div><span class="ok"></span>Your picture</div><div><span class="ok"></span>The stack size</div></div>` },
    { type:"Talk", title:"Not what you wanted?",
      body:`<p>Tell Gemini exactly what's different: what you wanted, and what happened in the game. And paste your code again.</p>`,
      visual:()=>`<div class="vs"><div class="bad"><h4>"It doesn't work"</h4><p>Gemini doesn't know what doesn't work, so it guesses.</p></div><div class="good"><h4>What you wanted and what happened</h4><p>"I wanted 16 in a stack, and in the game 64 fit. Here's my code:"</p></div></div>` },
    { type:"Activity", title:"Time left? Name your world",
      body:`<p>Only after your item is in the game.</p><ol><li>Press <b>Copy for Gemini</b> at the top, and in Gemini press <kbd>Ctrl</kbd> + <kbd>V</kbd>.</li><li>Below it, write the line from the box with the name from your world card, and send.</li><li>Gemini sends the file MyWorld.java. Press the copy button next to the code.</li><li>Press <b>Paste from Gemini & play</b> at the top.</li></ol>`,
      expect:"In the game, in Creative mode, there's a tab with your world's name.",
      stuck:[["Gemini asks questions and doesn't write code","Answer it. It asks so it understands exactly what you want."],["It says: what you copied isn't a whole file","In Gemini press the copy button next to the code, don't select it with the mouse."],["A yellow box appeared","The error is already copied. In Gemini press Ctrl + V, then Enter."]],
      visual:()=>H.gemPromptBox("Change my world's name to: ") },
    { type:"End", title:"Finishing",
      body:`<ul><li>Show your item to whoever sits next to you.</li><li>Close Minecraft.</li><li>Press <b>Drive</b> at the top, and save your world in your Drive.</li></ul>`,
      expect:"Next week: your item does something.",
      visual:()=>`<div class="checks"><div><span class="ok"></span>My item is in the game</div><div><span class="ok"></span>Show the person next to you</div><div><span class="ok"></span>My world is saved in Drive</div></div>` }
  ], challenges:{ card:["Item card","What it's for, the price, and where you get it."], item:["My item","The item in the game, with your name, line and picture."],
    world:["Name your world","The tab in the game has your world's name."], second:["A second item","Another item from your world, with its own picture."],
    shade:["Shadow and shine","The picture has a dark colour for shadow and a light one for shine."] } }
};

/* ---------- swap the words in a part of the page ---------- */
function translate(root){
  if (!root) return;
  const w = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { const t = tr(n.nodeValue); if (t !== null) n.nodeValue = t; });
  root.querySelectorAll("[placeholder],[aria-label],[title]").forEach(el => ["placeholder","aria-label","title"].forEach(a => {
    const v = el.getAttribute(a); if (v){ const t = tr(v); if (t !== null) el.setAttribute(a, t); } }));
}
// Messages that change later (button results, the picture editor) get translated as they appear.
let mo = null;
function watch(app){
  if (mo) return;
  mo = new MutationObserver(list => { if (LS.get("lang", "he") !== "en") return;
    list.forEach(m => { if (m.type === "characterData"){ const t = tr(m.target.nodeValue); if (t !== null) m.target.nodeValue = t; }
      else m.addedNodes.forEach(n => { if (n.nodeType === 3){ const t = tr(n.nodeValue); if (t !== null) n.nodeValue = t; } else if (n.nodeType === 1) translate(n); }); }); });
  mo.observe(app, { subtree:true, childList:true, characterData:true });
}
window.HUB_EN = {
  translate: root => { translate(root); watch(document.getElementById("app")); },
  // A step in English: its words from EN_L, its picture (visual) and behaviour (mount) from the Hebrew step unless replaced.
  step: (n, i, he) => { const e = EN_L[n] && EN_L[n].steps[i]; return e ? Object.assign({}, he, e) : he; },
  challenges: (n, list) => { const e = EN_L[n] && EN_L[n].challenges; if (!e) return list;
    return list.map(c => e[c.id] ? Object.assign({}, c, { t:e[c.id][0], d:e[c.id][1], lvl: c.lvl === "חובה" ? "must" : "challenge" }) : c); },
  lesson: n => EN_L[n]
};
})();
