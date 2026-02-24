# marys-fronted

Project for MARY GUIDEN APP, MARYS Design system and related clients.

Apps are react native based using Expo.

# Structure
* Applications/mary-guiden - The Mary Guiden app
* Applications/mary-ui-app - Test app for UI lib
* Lib/ - UI design system library

# TODO
* Setup Prettier to format code on save + Eslint for lib/
* Setup CI/CD
* Prepare MaryGuiden app for:
  * Backend integration REST + GraphQL
  * CMS provided content + translations
  * CI/CD
* Add more components to lib
* Review darkmode

# Troubleshooting
Common issue that can occur

## iOS
* When running `expo run:ios` the first time the app can crash with following error:

```
[CoreFoundation] *** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '-[RCTView setColor:]: unrecognized
selector sent to instance 0x1156901d0'
```

This can be solved by running commands:
* `cd <rootDirOfApp>/ios`
* `rm -rf Pods Podfile.lock build`
* `pod install`

