import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';

@Module({
  imports: [],
  providers: [ResponseService],
  exports: [ResponseService],
})
class CommonModule {}

export { CommonModule };
