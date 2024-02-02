// import { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const DonationForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (error) {
//       console.error(error);
//       setLoading(false);
//       return;
//     }

//     // Send the paymentMethod.id to your server to process the payment
//     const result = await fetch('/api/donate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ payment_method_id: paymentMethod.id }),
//     });

//     if (result.ok) {
//       // Payment successful
//       console.log('Payment successful');
//     } else {
//       // Payment failed
//       console.error('Payment failed');
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Donate'}
//       </button>
//     </form>
//   );
// };

// export default DonationForm;
