import { NestFactory } from '@nestjs/core';
import { Context, Handler } from 'aws-lambda';
import { Server } from 'http';
import * as serverless from 'aws-serverless-express';
import exp from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { eventContext } from "aws-serverless-express/middleware";

const express = exp();
let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
    const app = await NestFactory.create(
        AppModule,
        express,
        { logger: false }
    );
    app.enableCors();
    app.use(eventContext());
    app.useGlobalPipes(new ValidationPipe({
        validationError: {
            target: false
        }
    }));
    await app.init();

    return serverless.createServer(express);
};

export const handler: Handler = async (event: any, context: Context) => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }

    return serverless.proxy(cachedServer, event, context, "PROMISE").promise;
};