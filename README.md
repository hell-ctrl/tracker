
# tracker

Olá, eu desenvolvi essa ferramenta inspirado na ferramenta [seeker](https://github.com/thewhiteh4t/seeker), para treinar meus conhecimentos e para mostar o quanto estamos vulneraveis na internet, e não devemos confiar em qualquer link que acessamos.


## o que a ferramenta pode capturar?

* Informações do dispositivo
  * nome do dispositivo
  * sistema operacional
  * ram
  * gpu
  * browser
  * bateria
* Informações do ip
  * ip
  * tipo
  * timezone
  * continente
  * país
  * estado
  * cidade
  * org
* Informações da localização
  * latitude
  * longitude
  * altitude
  * velocidade
  * mapa

## como instalar a ferramenta?

### termux
```
  apt update && apt upgrade -y

  pkg install git -y

  git clone https://github.com/hell-ctrl/tracker

  cd tracker

  chmod +x install.sh

  ./install.sh
```
### linux
```
  sudo apt-get update && sudo apt-get upgrade -y

  sudo apt-get install git -y

  git clone https://github.com/hell-ctrl/tracker

  cd tracker

  chmod +x install.sh

  ./install.sh
 ```
## como usar a ferramenta?

```bash

   # passo 1 - iniciar a ferramenta

   node src/tracker.js

   # passo 2 - quando informar a url, um servidor express na porta 8080 será iniciando.

   # passo 3 - entre na url `http://localhost:8080` e aperte em permitir, aceitando a solicitação de localização.

   # passo 4 - volte para a ferramenta e veja as informações capturadas.

   # usando o ngrok:

   # abra uma nova aba e inicie o ngrok com o comando

   ./ngrok http 8080

```

## capturas de tela

![tracker](https://raw.githubusercontent.com/hell-ctrl/tracker/main/public/assets/tracker.png)
![localhost](https://raw.githubusercontent.com/hell-ctrl/tracker/main/public/assets/localhost.png)
