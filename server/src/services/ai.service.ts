// src/services/user.service.ts
import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";

// Interface for type safety
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the UserService class
class AIService extends Service {
  constructor(broker: ServiceBroker) {
    super(broker);

    this.parseServiceSchema({
      name: "aiService",
      actions: {
        // Action to fetch a user by ID
        getUser: {
          params: {
            id: "string",
          },
          async handler(ctx: Context<{ id: string }>) {
            const users: User[] = [
              { id: "1", name: "John Doe", email: "john@example.com" },
              { id: "2", name: "Jane Smith", email: "jane@example.com" },
            ];
            return users.find((user) => user.id === ctx.params.id);
          },
        },
      },
    });
  }
}

export default AIService;
