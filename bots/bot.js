// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TeamsActivityHandler, TurnContext, TeamsInfo, MessageFactory, ConversationState, MemoryStorage, UserState } = require('botbuilder');

// The accessor names for the conversation data and user profile state property accessors.
const CONVERSATION_DATA_PROPERTY = 'conversationData';
const USER_PROFILE_PROPERTY = 'userProfile';

class EchoBot extends TeamsActivityHandler {

	constructor(conversationState, userState) {
		super();

		// Create the state property accessors for the conversation data and user profile.
		this.conversationDataAccessor = conversationState.createProperty(CONVERSATION_DATA_PROPERTY);
		this.userProfileAccessor = userState.createProperty(USER_PROFILE_PROPERTY);

		// The state management objects for the conversation and user state.
		this.conversationState = conversationState;
		this.userState = userState;

		// See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
		this.onMessage(async (context, next) => {
			//await context.sendActivity(`input: '${context.activity.text}'`);

			TurnContext.removeRecipientMention(context.activity);
			const input = context.activity.text.trim();
			const tokens = input.split(" ");
			const command = tokens[0];
			const args = tokens.slice(1);

			const conversationData = await this.conversationDataAccessor.get(
				context, { currentRound: "", participiants: [], estimations: [] });

			//await context.sendActivity(`command: '${command}'`);
			//await context.sendActivity(`args: '${args.join(" ")}'`);

			switch (command) {
				case 'start':
					await context.sendActivity(`Starting Estimation Poker for '${args.join(" ")}'`);

					// Add message details to the conversation data.
					conversationData.currentRound = args.join(" ");
					conversationData.participiants = await TeamsInfo.getMembers(context);
					
					await this.messageAllMembersAsync(context, "Give me your estimation by telling me 'esti x', where x is your nummerical estimation without a unit. For example 'esti 5'. Use 'skip' to skip this round.");
					break;
				case 'skip':
					//streiche sender von der Teilnehmerliste der aktuellen Runde, ohne einen Wert für ihn zu erfassen
					await context.sendActivity(`${context.activity.from.name} skipped '${conversationData.currentRound}'`);
					conversationData.estimations[context.activity.from.id] = "skip";
					break;
				case 'esti':
					//streiche sender von der Teilnehmerliste und erfasse tokens[1] als Schätzwert für ihn
					await context.sendActivity(`${context.activity.from.name} estimates ${tokens[1]} units for '${conversationData.currentRound}'.`);
					conversationData.estimations.push({id: context.activity.from.id, estimation: tokens[1]});
					break;
				case 'finish':
					//streiche alle verbleibenden Teilnehmer, so als hätten sie skip eingegeben
					//auswerten
					await context.sendActivity(`par: '${conversationData.participiants.length}', est: '${conversationData.estimations.length}'`);
					
					let estimationCnt = new Map();
										
					for (let cnt = 0;  cnt < conversationData.estimations.length; cnt++) {
						if (estimationCnt.has(conversationData.estimations[cnt].estimation)) {
							estimationCnt.get(conversationData.estimations[cnt].estimation) += 1;
						} else {
							estimationCnt.set(conversationData.estimations[cnt].estimation, 1);
						}
					}
					
					await context.sendActivity(`${estimationCnt.size}`);
					
					for (let entry of estimationCnt) {
						await context.sendActivity(`'${entry.key}' = '${entry.value}'`)
					}
					
					//zurücksetzen
					conversationData.currentRound = "";
					conversationData.participiants = [];
					conversationData.estimations = [];

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
			const output = MessageFactory.text(`${message}`);

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

	/**
 * Override the ActivityHandler.run() method to save state changes after the bot logic completes.
 */
	async run(context) {
		await super.run(context);

		// Save state changes
		await this.conversationState.saveChanges(context);
		await this.userState.saveChanges(context);
	}
}

module.exports.EchoBot = EchoBot;
