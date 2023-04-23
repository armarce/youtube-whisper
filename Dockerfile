FROM cnstark/pytorch:1.13.0-py3.9.12-cuda11.7.1-ubuntu20.04


ENV TZ=Asia/Dubai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install curl
RUN apt-get install -y sudo
RUN apt-get install -y ffmpeg
RUN python -m pip install -U yt-dlp
RUN pip install -U openai-whisper
RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_19.x | sudo -E bash - 
RUN apt-get install -y nodejs

WORKDIR /app
COPY package*.json ./
RUN npm install && npm install pm2 -g
COPY . .

EXPOSE 4000

CMD ["pm2-runtime", "./src/server.js"]