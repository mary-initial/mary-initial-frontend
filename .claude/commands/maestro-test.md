Create a Maestro E2E test flow for a screen or feature in one of the apps.

If the user hasn't specified the app and feature, ask:
- Which app? (`mary-ui-app` or `mary-guiden`)
- What screen or feature to test?

## App IDs
- `mary-ui-app` → `dk.marys.marysuiexample`
- `mary-guiden` → `dk.marys.maryguiden`

## Steps

1. Read the relevant screen component in `applications/<app>/app/`
2. Identify:
   - `testID` props on interactive elements (needed for reliable Maestro targeting)
   - Navigation path to reach the screen
   - Interactions to perform (tap, scroll, type)
   - Assertions to make (text visible, element present)
   - Screenshots to capture
3. If key elements lack `testID` props, add them to the component first
4. Create `.maestro/<app-name>/<FeatureName>.yml`

## YAML Structure
```yaml
appId: <app-bundle-id>
name: <Feature Name>
---
- launchApp
# navigate if needed:
- tapOn: "<NavigationLabel>"
# interact:
- tapOn:
    id: "<testID>"
# or tap by text:
- tapOn: "<Visible Text>"
# assert:
- assertVisible: "<Expected Text>"
# repeat for multi-click:
- repeat:
    times: 3
    commands:
      - tapOn: "<button>"
# screenshot:
- takeScreenshot: <FeatureName>
```

## Reference
See `.maestro/mary-ui-app/Button.yml` for the exact pattern.

## Rules
- Prefer `testID` targeting over text-based targeting for stability
- Always end with `takeScreenshot`
- Keep flows focused on one feature — one file per feature
