// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { ProductCardProps } from 'types/product';
import axios from '../../utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from '../../types';
import { Address } from '../../types/cart';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['cart'] = {
  error: null,
  checkout: {
    step: 0,
    products: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    payment: {
      type: 'free',
      method: 'cod',
      card: ''
    }
  }
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // ADD PRODUCT
    addProductSuccess(state, action) {
      const { id, quantity } = action.payload;
      const sameItem = state.checkout.products.filter((data) => data.id === id)[0];
      const index = state.checkout.products.indexOf(sameItem);
      if (index > -1) {
        const oldData = [...state.checkout.products];
        oldData[index].quantity = oldData[index].quantity + quantity;
        state.checkout.products = oldData;
      } else {
        state.checkout.products.push(action.payload);
      }
      // state.checkout.products.push(action.payload);
      // console.log({ ...state, ...action.payload });

      // return { ...state.checkout.products, ...action.payload };

      // localStorage.setItem('cart', [...state.checkout.products, action.payload])
    },

    // REMOVE PRODUCT
    removeProductSuccess(state, action) {
      state.checkout.products = action.payload;
    },

    // UPDATE PRODUCT
    updateProductSuccess(state, action) {
      state.checkout.products = action.payload.products;
      state.checkout.subtotal = state.checkout.subtotal - action.payload.oldSubTotal + action.payload.subtotal;
      state.checkout.total = state.checkout.total - action.payload.oldSubTotal + action.payload.subtotal;
    },

    // SET STEP
    setStepSuccess(state, action) {
      state.checkout.step = action.payload.step!;
    },

    // SET NEXT STEP
    setNextStepSuccess(state, action) {
      state.checkout.step += 1;
    },

    // SET BACK STEP
    setBackStepSuccess(state, action) {
      state.checkout.step -= 1;
    },

    // SET BILLING ADDRESS
    setBillingAddressSuccess(state, action) {
      state.checkout.billing = action.payload.billing;
    },

    // SET DISCOUNT
    setDiscountSuccess(state, action) {
      let difference = 0;
      if (state.checkout.discount > 0) {
        difference = state.checkout.discount;
      }

      state.checkout.discount = action.payload.amount;
      state.checkout.total = state.checkout.total + difference - action.payload.amount;
    },

    // SET SHIPPING CHARGE
    setShippingChargeSuccess(state, action) {
      state.checkout.shipping = action.payload.shipping;
      state.checkout.total += action.payload.newShipping;
      state.checkout.payment = {
        ...state.checkout.payment,
        type: action.payload.type
      };
    },

    // SET PAYMENT METHOD
    setPaymentMethodSuccess(state, action) {
      state.checkout.payment = {
        ...state.checkout.payment,
        method: action.payload.method
      };
    },

    // SET PAYMENT CARD
    setPaymentCardSuccess(state, action) {
      state.checkout.payment = {
        ...state.checkout.payment,
        card: action.payload.card
      };
    },

    // RESET CART
    resetCardSuccess(state, action) {
      state.checkout = initialState.checkout;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function addProduct(product: ProductCardProps) {
  return async () => {
    try {
      dispatch(slice.actions.addProductSuccess(product));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function removeProduct(products: ProductCardProps[]) {
  return async () => {
    try {
      dispatch(slice.actions.removeProductSuccess(products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateProduct(id: string | number | undefined, quantity: number, products: ProductCardProps[]) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/update', {
        id,
        quantity,
        products
      });
      dispatch(slice.actions.updateProductSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setStep(step: number) {
  return () => {
    dispatch(slice.actions.setStepSuccess(step));
  };
}

export function setNextStep() {
  return () => {
    dispatch(slice.actions.setNextStepSuccess({}));
  };
}

export function setBackStep() {
  return () => {
    dispatch(slice.actions.setBackStepSuccess({}));
  };
}

export function setBillingAddress(address: Address | null) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/billing-address', {
        address
      });
      dispatch(slice.actions.setBillingAddressSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setDiscount(code: string, total: number) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/discount', { code, total });
      dispatch(slice.actions.setDiscountSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setShippingCharge(charge: string, shipping: number) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/shipping-charge', {
        charge,
        shipping
      });
      dispatch(slice.actions.setShippingChargeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setPaymentMethod(method: string) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/payment-method', { method });
      dispatch(slice.actions.setPaymentMethodSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setPaymentCard(card: string) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/payment-card', { card });
      dispatch(slice.actions.setPaymentCardSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetCart() {
  return async () => {
    try {
      const response = await axios.post('/api/cart/reset');
      dispatch(slice.actions.resetCardSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
