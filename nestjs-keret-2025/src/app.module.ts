import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TermekModule } from './termek/termek.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TermekModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
