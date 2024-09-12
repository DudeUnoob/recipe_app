from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from datasets import load_dataset

# Load pre-trained model and tokenizer
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# Set the pad token
tokenizer.pad_token = tokenizer.eos_token
model.config.pad_token_id = tokenizer.pad_token_id

# Prepare your dataset
def tokenize_function(examples):
    return tokenizer(examples['steps'], padding='max_length', truncation=True, max_length=512)

# Load the dataset
recipe_dataset = load_dataset("csv", data_files="RAW_recipes.csv")

# Split the dataset into train and test
train_test_dataset = recipe_dataset['train'].train_test_split(test_size=0.2)

# Tokenize the datasets
tokenized_datasets = train_test_dataset.map(tokenize_function, batched=True, remove_columns=train_test_dataset["train"].column_names)

# Create a data collator
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

# Fine-tune the model
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    logging_dir='./logs',
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets['train'],
    eval_dataset=tokenized_datasets['test'],
    data_collator=data_collator,
)

trainer.train()

# Save the fine-tuned model
model.save_pretrained('./path_to_finetuned_model')

from fastapi import FastAPI
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = FastAPI()

# Load the fine-tuned model and tokenizer
model = GPT2LMHeadModel.from_pretrained('./path_to_finetuned_model')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

@app.post("/generate-recipe/")
async def generate_recipe(prompt: str):
    inputs = tokenizer.encode(prompt, return_tensors='pt')
    outputs = model.generate(inputs, max_length=150, num_return_sequences=1, no_repeat_ngram_size=2)
    return {"generated_recipe": tokenizer.decode(outputs[0], skip_special_tokens=True)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)