// src/types/doctor.ts
export type DoctorCard = {
    id: string | number;
    slug: string;
    fullName?: string;
    specialty?: string;
    photoUrl?: string;
    acceptsDeclarations?: string | boolean;
    // дозволяємо додаткові поля, щоб не ламати існуюче звертання у гріді
    [key: string]: unknown;
  };
  