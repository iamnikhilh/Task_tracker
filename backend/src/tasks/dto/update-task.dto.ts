import { IsOptional, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'])
  status?: string;
}