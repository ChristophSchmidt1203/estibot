# estibot
Teams Bot for Facilitating Estimation Poker in Distributed Teams

# Protocol
---
```
# in a Teams Channel
$ in a Private Conversation between Bot and Human
> sending to the bot
< receiving from the bot

#> !start estimation-poker SP Iteration 8
#< To join the poker, please type !join 8efa2eac. End the poker with "!quit". 
#> !join 8efa2eac
$< Welcome to the estimation poker of Iteration 8, please wait for the estimation tasks to begin. Leave with typing "!leave".
#> !estimate RS360-420
$< Please type your estimation for RS360-420 here in private, without the unit SP. Type "!skip" to skip this task.
$> 2
#< Everyone posted an estimation for RS360-420, here are the results:
#< 1x 2 SP
#< 2x 3 SP
#< 1x 8 SP 
#< mean: 4 SP, median: 3 SP
#< 1x skip

#> !finish - end the estimation for the current task right now (force unresponsive participants to skip)
```

---

# Documentation
* https://365guide.de/in-14-schritten-zum-microsoft-teams-bot-anleitung/
* https://gate4.com/blog/wie-baut-man-einen-microsoft-teams-bot/
* https://gate4.com/blog/wie-deployed-man-einen-microsoft-teams-bot/
* https://www.reddit.com/r/autowikibot/wiki/redditbots
