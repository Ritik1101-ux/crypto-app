import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CryptoState {
    data: { name: string; imageUrl: string; price: number; marketcap: number }[];
    selectedCrypto: string;
    loading: boolean;
    error: string | null;
}

const initialState: CryptoState = {
    data: [],
    selectedCrypto: "bitcoin",
    loading: false,
    error: null,
};

export const fetchCryptoData = createAsyncThunk(
    "crypto/fetchCryptoData",
    async (crypto: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/crypto/${crypto}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        setSelectedCrypto: (state, action: PayloadAction<string>) => {
            state.selectedCrypto = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCryptoData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<any>) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCryptoData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
