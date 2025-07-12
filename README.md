# G-Scores Frontend

The Frontend of G-Scores web app using React.

## How to install

### Clone the project to the machine

- Clone the project

```bash
# Clone the project
git clone https://github.com/thanhKasper/gscores-frontend.git

# At the directory where you clone the project
cd gscores-frontend
```

- Create an <code>.env</code> file at your root directory and type like the code below

```sh
VITE_BACKEND_URL={YOUR-BACKEND-URL}
```

- Install the packages and run

```bash
# Install all packages
yarn install

# Run the project
yarn dev
```

### Running with Docker

```bash
docker build -t gscores-fe:latest .

docker run --name gscores-fe -p 80:80 gscores-fe

# Ensure that the backend also run with docker to make this work
```

## Preview

![Score Checking Page](preview/score-checking.png)
![Score Statistics Page](preview/score-stat.png)
![Score Ranking Page](preview/score-rank.png)