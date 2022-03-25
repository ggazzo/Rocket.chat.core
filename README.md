# RocketChatCore

This is a temporary repository, created with the aim of sharing what we consider most important code among the different applications.

We intend to move this code to the main repository (https://github.com/RocketChat/Rocket.chat). But there are several challenges during the migration to a monorepo. We decided to start with the most advantageous part.

For now, we have the model definitions, the rest version 1 api endpoints, a client for simple rest and websocket calls. And a new SDK proposal.

If you are looking for a solution for in-app chat, most likely you just need to look at [SDK](./packages/sdk). The other packages tend to be more 'inflexible' as they are more critical and follow application changes and interests.

To make it easier, the Major and Minor versions will be the same as the rocket.chat application
