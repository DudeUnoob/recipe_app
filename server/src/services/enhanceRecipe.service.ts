import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";

class EnhanceRecipeService extends Service {

    constructor(broker: ServiceBroker){
        super(broker);

        this.parseServiceSchema({
            name: "enhanceRecipe",
            actions: {
                enhanceRecipe: {
                    params: {
                        recipeToEnhance: "string",
                        userPreferences: "string",
                    },

                    async handler(ctx: Context<{ recipeToEnhance: string, userPreferences: string}>) {

                        const { recipeToEnhance, userPreferences } = ctx.params;

                        return { message: recipeToEnhance + userPreferences }
                    }
                }
            }
        })
    }
}

export default EnhanceRecipeService