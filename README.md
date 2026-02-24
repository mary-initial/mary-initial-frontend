# marys-fronted

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

