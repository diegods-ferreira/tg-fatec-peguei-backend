import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';

@Entity('chat_messages')
class ChatMessage {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  chat_id: string;

  @Column('uuid')
  from: string;

  @Column('uuid')
  to: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;
}

export default ChatMessage;
