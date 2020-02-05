// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TeamsActivityHandler, TurnContext, TeamsInfo, MessageFactory, ConversationState, MemoryStorage, UserState } = require('botbuilder');

class EchoBot extends TeamsActivityHandler {
	constructor() {
		super();
		// See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
		this.onMessage(async (context, next) => {
			await context.sendActivity(`input: '${context.activity.text}'`);

			TurnContext.removeRecipientMention(context.activity);
			const input = context.activity.text.trim();
			const tokens = input.split(" ");
			const command = tokens[0];
			const args = tokens.slice(1);

			await context.sendActivity(`command: '${command}'`);
			await context.sendActivity(`args: '${args.join(" ")}'`);

			switch (command) {
				case 'start':
					await context.sendActivity(`Starting Estimation Poker for '${args.join(" ")}'`);
					await this.messageAllMembersAsync(context, "Give me your estimation by telling me 'esti x', where x is your nummerical estimation without a unit. For example 'esti 5'. Use 'skip' to skip this round.");
					break;
				default:
					await context.sendActivity(`Unsupported command: '${command}'`);

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

	// If you encounter permission-related errors when sending this message, see
	// https://aka.ms/BotTrustServiceUrl
	async messageAllMembersAsync(context, message) {
		const members = await TeamsInfo.getMembers(context);

		members.forEach(async (teamMember) => {
			//const message = MessageFactory.text(`Hello ${teamMember.givenName} ${teamMember.surname}. I'm a Teams conversation bot.`);
			const output = MessageFactory.text(`${ message }`);

			var ref = TurnContext.getConversationReference(context.activity);
			ref.user = teamMember;

			await context.adapter.createConversation(ref,
				async (t1) => {
					const ref2 = TurnContext.getConversationReference(t1.activity);
					await t1.adapter.continueConversation(ref2, async (t2) => {
						await t2.sendActivity(output);
					});
				});
		});

		//await context.sendActivity(MessageFactory.text('All messages have been sent.'));
	}
}

module.exports.EchoBot = EchoBot;
