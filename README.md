#Here & Now

- Installation à faire après avoir clone ce dépôt

    ```shell
    npm install -g cordova ionic
    cd here-and-now-app
    npm install
    bower install
    ```

- Emulation sur Chrome

    ```shell
    cd here-and-now-app
    ionic serve
    ```

Mac OS X

- Installation émulateur iOS

    ```shell
    cd here-and-now-app
    ionic platform add ios
    ```

- Emulation App iOS

    ```shell
    cd here-and-now-app
    ionic build ios
    ionic emulate ios
    ```

Mac OS X - Linux

- Installation émulateur Android

    ```shell
    cd here-and-now-app
    brew install android-sdk
    android
    ```
    Une fenêtre va s'ouvrir. Lancer l'install des packages et accepter les licences.

    ```shell
    ionic platform add android
    ```

- Emulation App Android

     En cours
