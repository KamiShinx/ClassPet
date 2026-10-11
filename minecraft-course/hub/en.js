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
  "בתשובה של ג׳מיני אין שינוי לעיצוב. אם רציתם שינוי, כתבו לו: ״תשלח את השינוי כבלוק studio״.":"Gemini's answer has no change for your design. If you wanted one, write to it: \"send the change as a studio block\".",
  "ג׳מיני שלח שינוי שבור. כתבו לו: ״הבלוק שלך לא תקין, תשלח אותו שוב״.":"Gemini sent a broken change. Write to it: \"your block is broken, send it again\".",
  "ג׳מיני לא שלח שום שינוי שהסטודיו מכיר.":"Gemini didn't send any change the studio knows.",
  "ובג׳מיני לוחצים":"and in Gemini press", ". מתחת כותבים מה אתם רוצים: רעיון, שאלה, או שינוי.":". Below it, write what you want: an idea, a question, or a change.",
  "ג׳מיני הציע שינוי? מעתיקים את כל התשובה שלו, ולוחצים":"Gemini suggested a change? Copy its whole answer, and press",
  "יותר מדי חפצים: עד 60.":"Too many items: up to 60.", "השם ארוך מדי: עד 40 אותיות.":"The name is too long: up to 40 letters.", "המשפט מתחת לשם ארוך מדי: עד 80 אותיות.":"The line is too long: up to 80 letters.",
  "הסטודיו, לפני שינוי":"the studio, before a change",
  "מה החפץ עושה?":"What does the item do?", "גוררים בלוקים מהתפריט: קודם ״מתי״, ובתוכו מה קורה. אל תשכחו מחיר.":"Drag blocks from the menu: first a \"When\", and inside it what happens. Don't forget a price.",
  "במילים שלכם: מה החפץ אמור לעשות?":"In your own words: what should the item do?", "להעתיק את הבלוקים לג׳מיני":"Copy the blocks for Gemini",
  "ג׳מיני יבדוק אם הבלוקים עושים את מה שכתבתם, יסביר מה לא עובד, ויציע גרסה מתוקנת. אתם מחליטים אם לקחת אותה.":"Gemini checks whether the blocks do what you wrote, explains what doesn't work, and suggests a fixed version. You decide whether to take it.",
  "למשל: כשמכים יצור בלילה, נופל עליו ברק. אחרי זה המקל צריך לנוח.":"e.g. When I hit a creature at night, lightning strikes it. Then the stick needs to rest.",
  "ג׳מיני מציע גרסה משופרת לבלוקים:":"Gemini suggests a better version of your blocks:", "עכשיו":"Now", "אחרי":"After",
  "עוד אין בלוקים. קודם בונים, אחר כך משפרים עם ג׳מיני.":"No blocks yet. Build first, then improve with Gemini.",
  "הבלוקים הועתקו. בג׳מיני לוחצים Ctrl + V ושולחים. אחר כך מעתיקים את כל התשובה ולוחצים ״הדבקה מג׳מיני״.":"The blocks are copied. In Gemini press Ctrl + V and send. Then copy the whole answer and press \"Paste from Gemini\".",
  "הבלוקים של ג׳מיני נכנסו. אפשר לשנות אותם, ולהחזיר את הקודמים ב״גרסאות״.":"Gemini's blocks are in. You can change them, or bring back the old ones in Versions.",
  "ג׳מיני השתמש ביצור שאין בסטודיו.":"Gemini used a creature the studio doesn't have.", "ג׳מיני השתמש באפקט שאין בסטודיו.":"Gemini used an effect the studio doesn't have.",
  "ג׳מיני השתמש בצליל שאין בסטודיו.":"Gemini used a sound the studio doesn't have.", "ג׳מיני המציא בלוק שלא קיים.":"Gemini invented a block that doesn't exist.",
  "ג׳מיני שלח בלוקים שבורים. כתבו לו: ״הבלוקים שלך לא תקינים, תשלח אותם שוב״.":"Gemini sent broken blocks. Write to it: \"your blocks are broken, send them again\".", "הקוד באנגלית מתחיל באות.":"The English code starts with a letter.",
  "כרטיס העולם, ומיינקראפט שעובד על המחשב":"World card, and Minecraft working on the computer", "חפץ עם שם, ציור והסבר שלכם, בתוך המשחק":"An item with your name, picture and line, in the game",
  "מודל ב־Blockbench שמחזיקים ביד":"A Blockbench model you hold in your hand", "חפץ חזק שיש לו חיסרון":"A strong item with a downside", "אוכל או שיקוי עם אפקט חדש":"Food or a potion with a new effect",
  "מקום בעולם, עם תיבת אוצר":"A place in the world, with a treasure chest", "חוק ״כש... אם... אז...״ שעובד במשחק":"A \"when... if... then...\" rule that works in the game",
  "יצור עם סימן אזהרה לפני שהוא תוקף":"A creature with a warning sign before it attacks", "יצור שחי במקום שלכם ומפיל חפץ שלכם":"A creature that lives in your place and drops your item",
  "כולם משחקים בעולמות של כולם":"Everyone plays everyone's worlds", "צללית, תכונה אחת, 2–4 צבעים":"A silhouette, one trait, 2–4 colours", "מודל וציור ב־Blockbench":"A model and picture in Blockbench",
  "היצור שלכם זז בתוך העולם":"Your creature moves in the world", "אפשר לנצח אותו, אבל לא בניסיון הראשון":"It can be beaten, but not on the first try",
  "הישגים שמובילים את השחקן בעולם":"Achievements that lead the player through the world", "יצור שני, חוק שני, או בוס":"A second creature, a second rule, or a boss",
  "ממשיכים את מה שבחרתם":"Keep going with what you chose", "שום דבר חדש, רק תיקונים":"Nothing new, only fixes",
  "שותף משחק בעולם שלכם, ואתם מתקנים מה שלא עבד":"A partner plays your world, and you fix what didn't work", "המשפחות מגיעות ומשחקות בעולם שלכם":"Families come and play your world",
  "מתחילים מדוגמה":"Start from an example", "הדוגמה נכנסת לחפץ הזה, ואז משנים בה מה שרוצים: מספרים, יצורים, אפקטים, או בלוקים שלמים.":"The example goes into this item, then you change what you like: numbers, creatures, effects, or whole blocks.",
  "הדוגמה נכנסה. עכשיו משנים בה מה שרוצים.":"The example is in. Now change what you like.", "כשלוחצים לחיצה ימנית על יצור":"When you right-click a creature",
  // Oct rehaul: top bar, home, lesson screen, game button
  "תפריט":"Menu", "מיינקראפט סגור":"Minecraft closed", "המחשב בונה...":"Building...", "מיינקראפט פתוח":"Minecraft open", "המשחק לא נבנה":"The game didn't build", "לא מחובר":"Not connected",
  "לפתוח את מיינקראפט":"Open Minecraft", "המחשב בונה את העולם שלכם":"The computer is building your world", "דקה או שתיים. בינתיים לא סוגרים את הדף.":"A minute or two. Don't close the page meanwhile.",
  "שיניתם משהו? סוגרים את המשחק, ופותחים שוב.":"Changed something? Close the game, and open it again.", "מרימים יד וקוראים למורה.":"Raise your hand and call the teacher.",
  "הכפתור עובד רק כשפותחים את הדף מ־Minecraft בתפריט Start.":"The button works only when you open the page from Minecraft in the Start menu.",
  "המשחק לא נבנה.":"The game didn't build.", "השיעור הבא":"Next lesson", "ממשיכים מאיפה שעצרתם":"Pick up where you left off", "להתחיל":"Start", "להמשיך":"Continue",
  "כל החפצים של העולם שלכם, במקום אחד.":"All your world's items, in one place.", "כל הקורס":"The whole course", "נתקעתי":"I'm stuck", "סיימתם? אתגרים":"Done? Challenges",
  "מה אמור לקרות":"What should happen", "הבא ←":"Next →", "→ חזרה":"← Back", "סיימתי ←":"I'm done →", "מודים למיינקראפט":"Minecraft Mods",
  "להוריד את קובץ הגיבוי":"Download the backup file", "השם של העולם שלכם":"Your world's name", "מה הוא עושה: הבלוקים שלו":"What it does: its blocks",
  "עוד אין לחפץ בלוקים, אז הוא לא עושה כלום. זה בסדר.":"The item has no blocks yet, so it does nothing. That's fine.",
  "לחיצה ימנית מוחקת. קו מתאר כהה, ושניים עד ארבעה צבעים.":"Right-click erases. A dark outline, and two to four colours.", "טוען...":"Loading...",
  "המחשב בחר אותו. אפשר לשנות: אותיות קטנות, בלי רווחים.":"The computer chose it. You can change it: small letters, no spaces.",
  // the cleaned dock and studio (7 Oct)
  "הסטודיו":"Studio", "לסגור את מיינקראפט":"Close Minecraft", "המשחק לא נבנה.":"The game didn't build.",
  "מרימים יד וקוראים למורה.":"Raise your hand and call the teacher.", "או: ב״גרסאות״ מחזירים את הגרסה האחרונה שעבדה, ולוחצים שוב שחק.":"Or: in \"Versions\" bring back the last version that worked, and press Play again.",
  "להעתיק את השגיאה":"Copy the error", "מיינקראפט נסגר. אפשר ללחוץ שוב על שחק.":"Minecraft is closed. You can press Play again.",
  "מיינקראפט כבר פתוח. כדי לראות שינויים, לוחצים ״לסגור את מיינקראפט״ ואז שוב שחק.":"Minecraft is already open. To see changes, press \"Close Minecraft\" and then Play again.",
  "מיינקראפט פתוח. מה שמשנים עכשיו בסטודיו נכנס בפעם הבאה שפותחים את המשחק.":"Minecraft is open. What you change in the studio now goes in the next time the game opens.",
  "המחשב שומר גרסה לבד בזמן שעובדים. ״להחזיר״ מחזיר את העולם למה שהיה אז, ואפשר להתחרט גם על זה.":"The computer saves versions by itself while you work. \"Bring back\" returns your world to how it was then, and you can undo that too.",
  "העולם:":"World:", "שם העולם שלכם":"Your world's name", "לקורס":"Course", "החפצים שלי":"My items", "+ חפץ חדש":"+ New item", "בלי שם":"No name",
  "הציור והשם":"Picture and name", "מה הוא עושה?":"What does it do?", "ג׳מיני":"Gemini", "לנסות במשחק":"Try it in the game", "למחוק":"Delete",
  "אותיות קטנות, בלי רווחים":"small letters, no spaces", "המשפט מתחת לשם":"Line under the name", "למשל: מטבע דבש":"e.g. Honey coin",
  "רעיונות":"Ideas", "ג׳מיני שואל שאלות ועוזר לחשוב על העולם ועל החפץ. את הרעיונות אתם ממציאים.":"Gemini asks questions and helps you think about your world and your item. You invent the ideas.",
  "בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים.":"In Gemini press Ctrl + V, and below it write what you want.",
  "בדיקת הבלוקים":"Check the blocks", "ג׳מיני בודק אם הבלוקים עושים את מה שכתבתם, ומציע תיקון. אתם מחליטים אם לקחת אותו.":"Gemini checks whether the blocks do what you wrote, and suggests a fix. You decide whether to take it.",
  "ג׳מיני הציע שינוי? מעתיקים את כל התשובה שלו, ולוחצים":"Gemini suggested a change? Copy its whole answer, and press",
  "עוד אין חפצים":"No items yet", "לוחצים על ״חפץ חדש״, וממציאים את החפץ הראשון של העולם שלכם.":"Press \"New item\", and invent the first item of your world.",
  "מוכן למשחק.":"Ready for the game.", "עוד לא ייכנס למשחק:":"Won't go into the game yet:", "ייכנס למשחק, אבל:":"Goes into the game, but:",
  "חסר הקוד באנגלית.":"The English code is missing.", "הקוד באנגלית מתחיל באות, ויש בו רק אותיות קטנות, מספרים וקו תחתון.":"The English code starts with a letter, and has only small letters, digits and _.",
  "יש עוד חפץ עם אותו קוד באנגלית.":"Another item has the same English code.", "חסר שם.":"The name is missing.",
  "עוד אין ציור, אז במשחק יופיע ריבוע סגול ושחור.":"No picture yet, so the game shows a purple and black square.",
  "כשמיינקראפט נפתח: E, ואז הלשונית של העולם שלכם.":"When Minecraft opens: E, then your world's tab.",
  "עוד אין בלוקים. קודם בונים ב״מה הוא עושה?״, אחר כך משפרים עם ג׳מיני.":"No blocks yet. First build in \"What does it do?\", then improve with Gemini.",
  "פותחים את הסטודיו":"Open the studio"
};
const RX = [
  [/^שלב (\d+) מתוך (\d+)$/, "Step $1 of $2"], [/^(\d+) מתוך (\d+) שיעורים$/, "$1 of $2 lessons"],
  [/^→ חזרה לשיעור (\d+)$/, "← Back to lesson $1"], [/^החפץ הזה עוד לא ייכנס למשחק: (.*)$/, s => "This item won't go into the game yet: " + (tr(s.replace(/^החפץ הזה עוד לא ייכנס למשחק: /, "")) || "")],
  [/^בחפץ ״(.*)״ הקוד באנגלית לא תקין.*$/, "In the item \"$1\" the English code isn't right: small letters, digits and _, starting with a letter."],
  [/^יש שני חפצים עם הקוד (\w+)\. בחפץ ״(.*)״ בוחרים קוד אחר\.$/, "Two items have the code $1. Choose another code for \"$2\"."],
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
const IN_GAME_EN = `<ol class="ingame"><li><b>Singleplayer</b>, then your world. No world? <b>Create New World</b>, set Game Mode to <b>Creative</b>, and <b>Create</b>.</li>
  <li>Press <kbd>E</kbd>, and in the tabs at the top find the tab with your world's name.</li></ol>`;
const EN_L = {
  1: { unit:"Unit 1 · Getting started", title:"Lesson 1: My world",
    stations:[["Your code",1],["Your world",2],["Minecraft",4],["Drive",5]],
    steps:[
      { title:"Welcome",
        body:`<p>In this course you build your own world inside Minecraft: items, creatures and rules that you invent.</p><p>Everything happens on this page. Do what the step says, then press <b>Next</b>.</p>`,
        visual:()=>H.road([["Invent","On paper, with markers"],["Build on this page","Name, picture, and what it does. No code"],["Into the game","One button, and your world is in Minecraft"],["Save","At the end of every lesson, in Drive"]]) },
      { title:"Your code",
        body:`<p>When you opened the page, you chose 4 digits. Only this code opens your world.</p>
          <ul><li>Don't tell anyone your code.</li><li>Leaving the computer? At the top: <b>Menu</b>, then <b>Lock</b>.</li><li>Forgot your code? The teacher opens it with theirs, and you choose a new one.</li></ul>` },
      { title:"What's your world called?",
        body:`<p>On page 1 you wrote an idea for a world. Write its name here.</p>`,
        expect:"The name saves by itself. In the game it will be the name of your tab." },
      { title:"World card",
        body:`<p>Copy page 1 here. There are no right answers: it's your world.</p>`,
        hints:["Think of something you love: an animal, a place, a time, a food. What if it's huge? Scary? Lives in the sky?","Examples: \"Pirates in the sky on floating islands\" · \"A forest where night never ends\" · \"Giant bees that built a city of honey\".","Stuck on the rule? Think what's not allowed in your world, or what happens there only at night."] },
      { title:"Into Minecraft",
        body:`<p>Press the green button. The computer builds your world, and Minecraft opens by itself after a minute or two.</p>${IN_GAME_EN}`,
        visual:()=>H.gameBtn() + H.MC_MENU,
        expect:"There's a tab with your world's name, with one item in it: \"The first item\", with a purple and black square. That's fine: in lesson 2 you invent your own item.",
        stuck:[["A Welcome to Minecraft screen popped up","Press Continue."],["I can't find the tab","In the E menu there are arrows at the top that switch between pages of tabs."],["A red box appeared: the game didn't build","Raise your hand and call the teacher."]] },
      { title:"Save in Drive",
        body:`<p>School computers can be reset. What's in your Drive stays yours.</p>`,
        expect:"Your Drive has a file whose name starts with myworld.",
        note:"Next week the computer was reset, or you got a different one? At the top: <b>Menu</b>, then <b>Drive</b>, and bring your world back from there." }
    ], challenges:{ card:["World card","My world in one line, three colours and one rule."], mc:["Minecraft opened","I found the tab with my world's name in the game."], drive:["Saved in Drive","My backup file is in my Drive."] } },
  2: { unit:"Unit 2 · The first items", title:"Lesson 2: My first item",
    stations:[["Page 2",1],["Lightning stick",2],["My item",4],["In the game",7],["Drive",8]],
    steps:[
      { title:"Today: your own item, in the game",
        body:`<p>Today you invent an item and put it in the game, with a name, a picture and a power you choose.</p>`,
        visual:()=>H.road([["Page 2","Invent the item on paper"],["Lightning stick","A ready item: try it, and change it"],["My item","Name, picture, and what it does"],["In the game","Check that everything works"]]),
        note:"Your world is gone? The computer was probably reset, or it's a different one. At the top: <b>Menu</b>, then <b>Drive</b>, and bring your world back from there." },
      { title:"Invent it on paper",
        body:`<ol><li>Take page 2 and markers.</li><li>First the card: the name, the line under the name, what the item is for, and its price.</li><li>Then the drawing, on the 16 by 16 grid.</li></ol>`,
        hints:["An item from your world: what do you find there? What do you collect? What do people trade?","The line under the name can hint what the item is for, or what it costs.","Stuck on the price? Think what the item can't do, or what you lose when you use it."],
        visual:()=>`<div class="checks"><div><span class="ok"></span>The item's name, and the line under it</div><div><span class="ok"></span>What is it for?</div><div><span class="ok"></span>Its price</div><div><span class="ok"></span>Where you get it, and the stack size</div><div><span class="ok"></span>A 16 by 16 drawing</div></div>` },
      { title:"Lightning stick: an item that already works",
        body:`<p>This is a ready item. This is how it looks in the game, and this is what it does:</p>`,
        visual:()=>H.studioIn({ ready:"lightning_stick", parts:["card"] }) + `<h2 class="lp-sub">Try it</h2>` + H.gameBtn()
          + `<ol class="ingame"><li><b>Singleplayer</b>, then your world. No world? <b>Create New World</b>, <b>Creative</b>, and <b>Create</b>.</li><li>Press <kbd>E</kbd>, your world's tab, and take the lightning stick.</li><li>Hit a Zombie or a pig with the stick.</li></ol>`,
        expect:"Lightning strikes the creature. After every hit the stick rests 3 seconds.",
        stuck:[["No creature around","In the E menu look for Zombie Spawn Egg, and right-click the ground with it."],["Nothing happens when I hit","Hold the stick and hit a creature, not a block. And if the stick is resting, wait 3 seconds."],["A red box appeared: the game didn't build","Raise your hand and call the teacher."]] },
      { title:"Change the lightning stick",
        body:`<p>These are the stick's blocks. Change one thing:</p><ul><li><b>Easy:</b> click the number 3 and type 10. Now the stick rests longer.</li><li><b>Cool:</b> from the <b>Do</b> menu, drag "Summon Zombie" under the lightning.</li></ul><p>Then close Minecraft, open it again, and check.</p>`,
        note:"A change goes into the game only when it opens again." },
      { title:"Your item: name",
        body:`<p>Copy the name and the line under it from your paper. Then choose the stack size, and how rare the item is.</p>`,
        expect:"On the side you see the item as in the game, with the name in its rarity colour." },
      { title:"Your item: picture",
        body:`<p>Draw it like the drawing on your paper. The picture saves by itself.</p>`,
        hints:["Start with a dark outline, then fill it in.","Two to four colours are enough. One light colour gives shine.","Right-click erases."] },
      { title:"Your item: what does it do?",
        body:`<ol><li>Pick an example that fits what you wrote on paper: what the item is for, and its price.</li><li>Change it until it's yours: numbers, creatures, effects, or whole blocks.</li></ol>`,
        hints:["No example fits exactly? Take the closest one, and swap one block.","Every power has a price. If you deleted the price, what stops a player from using it all the time?"] },
      { title:"Check it in the game",
        body:`<ol><li>Minecraft open? Close it.</li><li>Press the green button.</li><li>In the game: <kbd>E</kbd>, your world's tab, and your item.</li><li>Check it against your paper: the name, the line, the picture, and what the item does.</li></ol>`,
        expect:"Everything like on your paper. And if something's different, that's exactly what you fix now: go back to its step, change it, and check again.",
        stuck:[["There's a purple and black square instead of the picture","The item has no picture yet. Go back to the picture step, then close and open the game."],["I changed something and the game doesn't show it","A change goes in only when the game opens again. Close Minecraft, and open it again."],["A red box appeared: the game didn't build","Raise your hand and call the teacher."]] },
      { title:"Save and finish",
        body:`<ul><li>Show your item to whoever sits next to you.</li><li>Close Minecraft.</li><li>Save your world in Drive:</li></ul>`,
        expect:"Next week: powers with \"if\". Only at night, only by chance, only with Shift." }
    ], challenges:{ card:["Page 2","What the item is for, its price, and where you get it."], tweak:["Lightning stick","I tried it in the game, and changed one thing in it."],
      item:["My item","The item in the game, with your name, line and picture."], power:["A power for my item","My item does something, from an example I changed."],
      second:["A second item","In the studio (Menu, then Studio): another item from your world."], shade:["Shadow and shine","The picture has a dark colour for shadow and a light one for shine."] } }
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
