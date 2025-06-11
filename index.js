import express from "express";
import path from "path";
import scenarios from "./data/scenarios.js";

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || "8089";

//set up Express app to use pug as a template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up folder folder for static files to be used in Express app
app.use(express.static(path.join(__dirname, "public")));

//Set up Express app to allow urlencoded format (query string format) to use JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set up Express app to allow urlencoded format (query string format) to use JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a route to render the home page
app.get("/", (req, res) => {
  res.render("index", { currentPath: req.path });
});

app.get("/scenarios", (req, res) => {
  res.render("scenarios", {
    scenarios,
    currentPath: req.path,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { currentPath: req.path });
});

app.get("/experience", (req, res) => {
  const scenarioId = req.query.scenario;

  // Find the scenario by ID
  const scenario = scenarios.find((s) => s.id === scenarioId);

  if (!scenario) {
    return res.redirect("/scenarios");
  }

  // Static data with local GIF filenames instead of keywords
  const extraData = {
    "scored-clasico": {
      gifFilename: "scored-clasico.gif",
      musicTitle: "We Are the Champions",
      musicArtist: "Queen",
      musicUrl: "https://open.spotify.com/embed/track/2KH16WveTQWT6KOG9Rg6e2",
      motivationalQuote:
        "You gave it your all and came out on top. That's the spirit of a champion.",
      moodName: "Victorious",
      moodEmoji: "🔥",
    },
    "benched-final": {
      gifFilename: "benched-final.gif",
      musicTitle: "The Sound of Silence",
      musicArtist: "Simon & Garfunkel",
      musicUrl: "https://open.spotify.com/embed/track/7hQJA50XrCWABAu5v6QZ4i",
      motivationalQuote: "Patience is a virtue. Your time will come.",
      moodName: "Frustrated",
      moodEmoji: "😞",
    },
    "lost-home": {
      gifFilename: "lost-home.gif",
      musicTitle: "Mad World",
      musicArtist: "Gary Jules",
      musicUrl: "https://open.spotify.com/embed/track/4VqPOruhp5EdPBeR92t6lQ",
      motivationalQuote: "Losses hurt. But they teach. Come back stronger.",
      moodName: "Defeated",
      moodEmoji: "😞",
    },
    "missed-penalty": {
      gifFilename: "missed-penalty.gif",
      musicTitle: "The Scientist",
      musicArtist: "Coldplay",
      musicUrl: "https://open.spotify.com/embed/track/75JFxkI2RXiU7L9VXzMkle",
      motivationalQuote:
        "You missed this one. But legends miss too. Try again.",
      moodName: "Gutted",
      moodEmoji: "😰",
    },
    "champions-league": {
      gifFilename: "champions-league.gif",
      musicTitle: "Hall of Fame",
      musicArtist: "The Script ft. will.i.am",
      musicUrl: "https://open.spotify.com/embed/track/3JvKfv6T31zO0ini8iNItO",
      motivationalQuote: "Glory is earned, not given. You did it.",
      moodName: "Glorious",
      moodEmoji: "🏆",
    },
    "transfer-rejected": {
      gifFilename: "transfer-rejected.gif",
      musicTitle: "Let It Be",
      musicArtist: "The Beatles",
      musicUrl: "https://open.spotify.com/embed/track/0aym2LBJBk9DAYuHHutrIl",
      motivationalQuote: "Sometimes, the door closes for a better one to open.",
      moodName: "Crushed",
      moodEmoji: "❌",
    },
  };

  const data = extraData[scenarioId];

  if (!data) {
    return res.redirect("/scenarios");
  }

  // Construct the local gif URL (assuming public/gifs is served at /gifs)
  const gifUrl = `/gifs/${data.gifFilename}`;

  res.render("experience", {
    scenarioTitle: scenario.title,
    gifUrl,
    musicTitle: data.musicTitle,
    musicArtist: data.musicArtist,
    musicUrl: data.musicUrl,
    motivationalQuote: data.motivationalQuote,
    moodEmoji: data.moodEmoji,
    moodName: data.moodName,
    currentPath: req.path,
  });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
