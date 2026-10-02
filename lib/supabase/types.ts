// Mirrors supabase/schema.sql. Regenerate with the Supabase CLI after migrations.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      emergency_requests: {
        Row: {
          id: string;
          created_at: string;
          kind: string;
          name: string;
          phone: string;
          email: string | null;
          address: string;
          what_happened: string;
          service: string | null;
          insurance_claim: boolean | null;
          source_page: string | null;
          utm: Json | null;
          status: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          kind?: string;
          name: string;
          phone: string;
          email?: string | null;
          address: string;
          what_happened: string;
          service?: string | null;
          insurance_claim?: boolean | null;
          source_page?: string | null;
          utm?: Json | null;
          status?: string;
          notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["emergency_requests"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
