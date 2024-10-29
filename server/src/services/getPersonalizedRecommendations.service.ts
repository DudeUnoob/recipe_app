import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";

class GetPersonalizedRecommendations extends Service {

    constructor(broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name: "getPersonalizedRecommendations",
            actions: {
                getPersonalizedRecommendations: {
                    params: {
                        user_id: "string",
                        user_preferences: "string"
                    },

                    async handler(ctx: Context<{ user_id: string, user_preferences: string }>) {
                        const{ user_id, user_preferences } = ctx.params;

                        return { message: user_id + user_preferences }
                    }
                }
            }
        })
    }
}

export default GetPersonalizedRecommendations