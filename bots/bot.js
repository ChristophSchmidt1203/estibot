// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, TurnContext, ConversationState, MemoryStorage, UserState } = require('botbuilder');

class EchoBot extends ActivityHandler {
	constructor() {
		super();
		// See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
		this.onMessage(async (context, next) => {
			await context.sendActivity(`input: '${context.activity.text}'`);

			TurnContext.removeRecipientMention(context.activity);
			const input = context.activity.text.trim();
			const tokens = input.split("\s");
			const command = tokens[0];
			const arguments = tokens.slice(1);

			switch (command) {
				case 'start':
					await context.sendActivity(`Starting Estimation Poker '${arguments.join(" ")}'`);
					break;
				default:
					await context.sendActivity(`Unsupported command: '${tokens[0]}'`);

					break;
			}








			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});






		this.onMembersAdded(async (context, next) => {
			const membersAdded = context.activity.membersAdded;
			for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
				if (membersAdded[cnt].id !== context.activity.recipient.id) {
					await context.sendActivity('Hello and welcome!');
				}
			}
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onConversationUpdate(async (context, next) => {
			await context.sendActivity('[conversationUpdate event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onMembersRemoved(async (context, next) => {
			await context.sendActivity('[onMembersRemoved event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onMessageReaction(async (context, next) => {
			await context.sendActivity('[onMessageReaction event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onReactionsAdded(async (context, next) => {
			await context.sendActivity('[onReactionsAdded event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onReactionsRemoved(async (context, next) => {
			await context.sendActivity('[onReactionsRemoved event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onEvent(async (context, next) => {
			await context.sendActivity('[onEvent event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onTokenResponseEvent(async (context, next) => {
			await context.sendActivity('[onTokenResponseEvent event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onUnrecognizedActivityType(async (context, next) => {
			await context.sendActivity('[onUnrecognizedActivityType event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onDialog(async (context, next) => {
			//await context.sendActivity('[onDialog event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});

		this.onTurn(async (context, next) => {
			//await context.sendActivity('[onTurn event detected]');
			// By calling next() you ensure that the next BotHandler is run.
			await next();
		});
		//
		//
		//
		//
		//
		//
		//
		//
	}
}

module.exports.EchoBot = EchoBot;
