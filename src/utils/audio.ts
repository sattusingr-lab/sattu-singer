/**
 * Utility for decoding raw PCM 24000Hz 16-bit mono audio from Gemini TTS
 * and converting it into a playable WAV Blob URL.
 */

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function pcmToWavBlob(pcmBytes: Uint8Array, sampleRate: number = 24000, numChannels: number = 1): Blob {
  const byteRate = sampleRate * numChannels * 2; // 16-bit = 2 bytes per sample
  const blockAlign = numChannels * 2;
  const buffer = new ArrayBuffer(44 + pcmBytes.length);
  const view = new DataView(buffer);

  /* RIFF chunk descriptor */
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcmBytes.length, true);
  writeString(view, 8, 'WAVE');

  /* FMT sub-chunk */
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true); // NumChannels (1 = Mono)
  view.setUint32(24, sampleRate, true); // SampleRate (24000)
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample (16 bits)

  /* DATA sub-chunk */
  writeString(view, 36, 'data');
  view.setUint32(40, pcmBytes.length, true);

  // Write PCM audio data
  const uint8View = new Uint8Array(buffer, 44);
  uint8View.set(pcmBytes);

  return new Blob([buffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export async function convertBase64PcmToWavUrl(base64Audio: string, sampleRate: number = 24000): Promise<string> {
  const pcmBytes = base64ToUint8Array(base64Audio);
  const blob = pcmToWavBlob(pcmBytes, sampleRate, 1);
  return URL.createObjectURL(blob);
}

// Voices list supported by Gemini TTS
export const GEMINI_VOICES = [
  { id: 'Puck', name: 'Puck', gender: 'male', tone: 'Energetic & Youthful', description: 'Confident, vibrant voice ideal for Sattu\'s creator & trader spirit' },
  { id: 'Charon', name: 'Charon', gender: 'male', tone: 'Deep & Grounded', description: 'Analytical, calm, and authoritative delivery for trading concepts' },
  { id: 'Kore', name: 'Kore', gender: 'female', tone: 'Warm & Expressive', description: 'Soothing and articulate, great for storytelling and lyrics' },
  { id: 'Fenrir', name: 'Fenrir', gender: 'male', tone: 'Bold & Dynamic', description: 'High-intensity motivation and execution focus' },
  { id: 'Zephyr', name: 'Zephyr', gender: 'female', tone: 'Crisp & Modern', description: 'Clean, tech-savvy voice for CCX ecosystem architecture' },
] as const;
