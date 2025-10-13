import { DocumentBuilder } from "@nestjs/swagger";

export function getSwaggerConfig(){
    return new DocumentBuilder()
    .setTitle('Starlight Cinema Backend API')
    .setDescription('API, предназначенное для работы мобильного приложения Starlight Cinema')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}