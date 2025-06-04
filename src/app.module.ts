import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Grabacion } from './models/grabacion.entity';
import { NavegacionSlide } from './models/navegacion_slide.entity';
import { FragmentoAudio } from './models/fragmento_audio.entity';

import { GrabacionModule } from './grabacion.module';
import { NavegacionSlideModule } from './navegacion-slide.module';
import { FragmentoAudioModule } from './fragmento-audio.module';
import { DebugModule } from './debug.module';
import { NotaSlideModule } from './nota-slide.module';
import { HistorialPracticaModule } from './historial-practica.module';

import { CrearGrabacionUseCase } from './use-cases/crear-grabacion.use-case';
import { AuthMiddleware } from './common/middleware/api-key.middleware';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Grabacion, NavegacionSlide, FragmentoAudio],
      autoLoadEntities: true,
      synchronize: true,
      extra: {
          family: 4, //  esto fuerza a que use IPv4 (Render lo necesita)
      },
    }),
    GrabacionModule,
    NavegacionSlideModule,
    FragmentoAudioModule,
    DebugModule,
    NotaSlideModule,
    HistorialPracticaModule,
    TypeOrmModule.forFeature([Grabacion]),
    MulterModule.register({
      dest: './uploads/audio',
    }),
  ],
  controllers: [],
  providers: [CrearGrabacionUseCase],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); // o una ruta específica como '/api/*'
  }
}
