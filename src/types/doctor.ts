// src/types/doctor.ts
export type DoctorCard = {
    id: string | number;
    slug: string;
  
    // 🔽 додали явні поля, які використовуєш у гріді
    name?: string;
    fullName?: string;
    department?: string;
    position?: string;
    specialty?: string;
  
    photoUrl?: string;
    acceptsDeclarations?: string | boolean;
  
    [key: string]: unknown;
  };
  