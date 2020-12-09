import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardDto {
  @Field()
  title: string;

  @Field()
  content: string;
}
