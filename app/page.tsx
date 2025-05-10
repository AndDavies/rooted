import { redirect, RedirectType } from 'next/navigation';

export default function Page() {
  // Perform the redirect server-side
  redirect('https://form.typeform.com/to/Jr3Vzzwi', RedirectType.push);
}