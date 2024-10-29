import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";
import { client } from "../functions/groq";

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

                        const chatCompletion = await client.chat.completions.create({
                            messages: [{
                                role: 'user',
                                content: `Given this current information/data on this recipe, enhance and improve it,
                                while also taking into priority consideration on the user's preferences/dietary restrictions:
                                ${recipeToEnhance}
                                \n\n\n

                                User's preferences/dietary restrictions: ${userPreferences}
                                `,
                                
                            }],
                            model: "llama3-8b-8192"

                        })

                        return { message: chatCompletion.choices[0].message.content }
                    }
                }
            }
        })
    }
}

export default EnhanceRecipeService