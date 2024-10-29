import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";
import { client } from "../functions/groq";


class GenerateRecipeService extends Service {

    constructor(broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name: "generateRecipe",
            actions: {
                generateRecipe: {
                    params: {
                        ingredients: "string",
                        userPreferences: "string"
                    },

                    async handler(ctx: Context<{ ingredients: string; userPreferences: string }>) {
                        const { ingredients, userPreferences } = ctx.params;

                        const chatCompletion = await client.chat.completions.create({
                            messages: [{
                                role: 'user',
                                content: `Generate and give me some recipes I can create
                                based off the ingredients provided as well as the user's preferences/dietary restrictions: ${ingredients}
                                \n\n\n
                                User preferences/dietary restrictions: ${userPreferences}`,
                                
                            }],
                            model: "llama3-8b-8192"

                        })
                        //   const chatCompletion = await client.chat.completions.create({
                        //     messages: [{ role: 'user', content: 'Give me some pizza recipes' }],
                        //     model: 'llama3-8b-8192',
                        //   });

                        //   return res.status(200).json({
                        //     message: chatCompletion.choices[0].message.content
                        //   })
                        return { message: chatCompletion.choices[0].message.content }
                    }
                }
            }
        })
    }


}

export default GenerateRecipeService