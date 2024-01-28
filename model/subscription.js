import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema({
    userId: { type: String, required: true },
    subscription:{type:Schema.Types.Mixed,required:true}
});

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
