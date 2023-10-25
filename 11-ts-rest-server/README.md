# Configuración de proyecto TS

Para empezar a trabajar con un proyecto de *typescript*, después de haber ejecutado el comando ``npm init -y`` es necesario crear y configurar el archivo **_tsconfig.json_** para hacerlo se debe ejecutar el comando (Es necesario tener typescript instalado de manera global para que el comando funcione):
``tsc --init``

Una vez hecho esto, en el archvio **tsconfig.json** se deberá tener habilitada la siguiente configuración en JSON:

```json
    "target": "es2016",
    "module": "commonjs",
    "moduleResolution": "node10",
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
```

Teniendo esta configuración, habrá que instalar tslint y typescript como dependencias de desarrollo en el proyecto, para esto hay que ejecutar los comandos de instalación:
```shell
npm i tslint --save-dev
npm i typescript --save-dev
```

El siguiente paso es preparar el arcivo **tslint.json**, para esto hay que dirigirse a la carpeta en los módulos de node para ejecutar tslint. En windows, el comando es:
```shell
.\node_modules\.bin\tslint --init
```

Esto creará un nuevo archivo llamado **_tslint.json_** en la ruta actual del proyecto, a este archivo en la propiedad de _rules_, se debe agregar los siguiente:

```json
{
    "no-console": false
}
```