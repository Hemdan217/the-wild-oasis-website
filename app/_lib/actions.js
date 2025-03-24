"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { deleteBooking, updateBooking, updateGuest } from "./data-service";
import { redirect } from "next/navigation";
export const updateGuestAction = async (formData) => {
  const session = await auth();
  console.log(formData, "this is the form data");
  let nationalID = formData.get("nationalID");
  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("National ID must be a number");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  try {
    await updateGuest(session.user.guestId, {
      nationalID,
      nationality,
      countryFlag,
    });
    revalidatePath("/account/profile");
  } catch (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
};

export const deleteReservationAction = async (bookingId) => {
  try {
    await deleteBooking(bookingId);
    revalidatePath("/account/reservations");
  } catch (error) {
    throw new Error(error);
  }
};
export const updateBookingAction = async (formData) => {
  console.log(formData, "this is the form data");
  try {
    await updateBooking(+formData.get("bookingId"), {
      observations: formData.get("observations"),
      numGuests: +formData.get("numGuests"),
    });
    revalidatePath("/account/reservations");
    return redirect("/account/reservations");
  } catch (error) {
    throw new Error(error);
  }
};
export const signInAction = async () => {
  await signIn("github", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut();
};
