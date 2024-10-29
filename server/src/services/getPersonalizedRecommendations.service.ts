import { Service, ServiceBroker } from "moleculer";
import { Context } from "moleculer";
import { client } from "../functions/groq";

class GetPersonalizedRecommendations extends Service {

    constructor(broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name: "getPersonalizedRecommendations",
            actions: {
                getPersonalizedRecommendations: {
                    params: {
                        user_id: "string",
                        userPreferences: "string"
                    },

                    async handler(ctx: Context<{ user_id: string, userPreferences: string }>) {
                        const{ user_id, userPreferences } = ctx.params;

                        const chatCompletion = await client.chat.completions.create({
                            messages: [{
                                role: 'user',
                                content: `
                                Reading this user's recipe history and taking in priority of the user's preferences/dietary restrictions,
                                Recommend some Breakfast Ideas, Similar Recipes, and Dessert Suggestions. Also please provide the ingredients and very detailed step-by-step instructions for each recipe: ${user_id}

                                \n\n\n



                                User's Preferences/Dietary Restrictions: ${userPreferences}


                                Also use this as the same structure to format your response:
                                Based on the user's recipe history, I can recommend some breakfast ideas, similar recipes, and dessert suggestions. However, since the user's preferences and dietary restrictions are not provided, I will make some general recommendations.

**Breakfast Ideas:**

1. **Scrambled Eggs with Herbs**: A simple and flavorful breakfast dish that can be made with scrambled eggs, fresh herbs, and a sprinkle of salt and pepper. Ingredients:
	* 2 eggs
	* 1 tablespoon butter
	* 1 tablespoon chopped fresh herbs (such as parsley, chives, or dill)
	* Salt and pepper to taste
	* Instructions: Scramble the eggs in a bowl, then heat the butter in a pan over medium heat. Pour in the eggs and stir until they are cooked through. Add the chopped herbs and season with salt and pepper.
2. **Avocado Toast**: A nutritious and filling breakfast that combines the creaminess of avocado with the crunch of whole grain bread. Ingredients:
	* 2 slices whole grain bread
	* 1 ripe avocado, mashed
	* Salt and pepper to taste
	* Optional: 1 egg, sliced or 1 tablespoon chopped fresh herbs
	* Instructions: Toast the bread, then spread with mashed avocado. Add a sliced egg or chopped herbs if desired.

**Similar Recipes:**

Since the user has a recipe for pancakes, I will recommend some similar recipes that use similar ingredients and techniques.

1. **Waffles**: A crispy and delicious breakfast food that can be made with a waffle iron. Ingredients:
	* 1 cup all-purpose flour
	* 2 teaspoons baking powder
	* 1 teaspoon salt
	* 1 cup milk
	* 1 egg
	* 2 tablespoons melted butter
	* Instructions: Preheat the waffle iron, then mix the dry ingredients in a bowl. In a separate bowl, whisk together the milk, egg, and melted butter. Add the wet ingredients to the dry ingredients and stir until just combined. Pour the batter onto the waffle iron and cook until golden brown.
2. **Belgian Waffles with Fresh Berries**: A sweet and indulgent breakfast treat that combines the crispy waffle with fresh berries and whipped cream. Ingredients:
	* 1 cup all-purpose flour
	* 2 teaspoons baking powder
	* 1 teaspoon salt
	* 1 cup milk
	* 1 egg
	* 2 tablespoons melted butter
	* 1 cup fresh berries (such as strawberries, blueberries, or raspberries)
	* Whipped cream and powdered sugar, optional
	* Instructions: Follow the instructions for making waffles, then top with fresh berries, whipped cream, and powdered sugar if desired.

**Dessert Suggestions:**

Since the user has a recipe for chocolate ice cream, I will recommend some similar dessert suggestions that use similar ingredients and techniques.

1. **Strawberry Sorbet**: A refreshing and light dessert that combines the sweetness of strawberries with the creaminess of sorbet. Ingredients:
	* 1 cup fresh strawberries
	* 1 cup granulated sugar
	* 1 cup water
	* 1 tablespoon lemon juice
	* 1/4 cup simple syrup (optional)
	* Instructions: Puree the strawberries, sugar, and water in a blender until smooth. Add the lemon juice and simple syrup (if using) and stir until combined. Pour the mixture into an ice cream maker and churn until set, then scoop and serve.
2. **Vanilla Panna Cotta**: A creamy and indulgent dessert that combines the richness of cream with the sweetness of vanilla. Ingredients:
	* 1 cup heavy cream
	* 1/2 cup whole milk
	* 1/4 cup granulated sugar
	* 1 vanilla bean, split
	* 1/4 teaspoon kosher salt
	* Instructions: Combine the cream, milk, sugar, vanilla bean, and salt in a saucepan and stir until the sugar is dissolved. Pour the mixture into individual serving cups and refrigerate until set, then serve chilled.
                                `,
                                
                            }],
                            model: "llama3-8b-8192"

                        })

                        return { message:  chatCompletion.choices[0].message.content }
                    }
                }
            }
        })
    }
}

export default GetPersonalizedRecommendations