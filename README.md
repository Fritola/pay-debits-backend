# Pay-debits Backend

This is the backend from Pay-debits, the platform where you can register debts and people who owe you. One of the first features of the Pay-debits is that the backend sends an email to the person that owes you

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node, yarn or npm, create an account on -> https://cloud.mongodb.com/
```

### Installing

```
yarn
```

after this, you'll need to create a file .env on the source of the project with the following variables:

```
CONNECTION_STRING = connection string from https://cloud.mongodb.com/
EMAIL_LOGIN = login from the provider email
EMAIL_PASSWORD = password from the provider email
```
