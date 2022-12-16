import { IsNotEmpty, IsUUID, Length, IsDate } from 'class-validator';

export class NotificationToReturnByListDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  category: string;

  @IsDate()
  readAt?: Date | null;

  @IsDate()
  canceledAt?: Date | null;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
