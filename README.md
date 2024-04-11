# Native Fitness

Native is a habit/workout app with a gamified motive behind it. Where you complete quests/chores and level up your character to defeat stronger bosses.

# Setup

1. You need a working android emulator or a device with the "Expo Go" mobile app installed. To setup an emulator download android studio or the CLI from https://developer.android.com/studio. After downloading you need to setup an AVD, see this guide https://developer.android.com/studio/run/emulator.
2. Clone the repo and run `npm install`
3. Start the app using `npx expo start` and choose your device (e.g. 'a' for android).

# Workflow

Packages:
* Expo Sqlite
* Redux toolkit
* Expo linear gradient
* React navigation

The app uses expo-sqlite for persistent storage which we read into redux on startup (configured in src/screens/splash.tsx). Static data is stored in src/data directory. Anything that is not user related or due to change is saved here. All images are stored in the src/assets directory.

To better understand how the database is structured see src/types/global.d.ts. Most columns are self explantory, some can be explained further:
* user_bag: Comma seperated string of all items avaiable in the app
* user_equipped: Comma seperated string of all currentely equiped items, most be an item from user_bag. You can only have max 4 items equiped, this limit is already set in redux.
* quests_done_count: The total amount of times you've completed the same quest.
* quest_active: When you complete a quest it's unavailable for the rest of the day. After completing this is set to 1, hiding it from the user, When a new day start set this value back to 0.

# Todo

Display completed quests in Home Screen

Decide on how to setup online accounts.
	Currentely the Login Screen only changes the view, there is only 1 local account in sqlite.

The logout button in Settings Screen drops the database, change this after setting up accounts.

Use health API from the device to track progress.

Add more items & bosses.

Item drops when defeating bosses.

Update quest_active from 0 to 1 on a new day.
