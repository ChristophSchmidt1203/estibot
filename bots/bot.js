// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');

class EchoBot extends ActivityHandler {
	constructor() {
		super();
		// See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
		this.onMessage(async (context, next) => {
			await context.sendActivity(`Your message contains: text: '${context.activity.text}'`);

			const input = context.activity.text;

			const mentions = TurnContext.getMentions(turnContext.activity);
			if (mentions) {
				const firstMention = mentions[0].mentioned;
				await turnContext.sendActivity(`Mention: ${firstMention.name}.`);
			} else {
				await turnContext.sendActivity(`Aw, no one was mentioned.`);
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
