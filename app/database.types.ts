export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      alembic_version: {
        Row: {
          version_num: string
        }
        Insert: {
          version_num: string
        }
        Update: {
          version_num?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created: string | null
          id: string
          recipe_id: string | null
          user_id: string | null
        }
        Insert: {
          created?: string | null
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Update: {
          created?: string | null
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_favorites_recipe_id_recipes"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_favorites_user_id_users"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ingredients: {
        Row: {
          created: string | null
          food: string | null
          id: string
          quantity: number | null
          recipe_id: string | null
          text: string | null
          unit: string | null
        }
        Insert: {
          created?: string | null
          food?: string | null
          id?: string
          quantity?: number | null
          recipe_id?: string | null
          text?: string | null
          unit?: string | null
        }
        Update: {
          created?: string | null
          food?: string | null
          id?: string
          quantity?: number | null
          recipe_id?: string | null
          text?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ]
      }
      recipes: {
        Row: {
          created: string | null
          cuisine: string | null
          description: string | null
          dish_type: string | null
          id: string
          image: string | null
          is_draft: boolean | null
          meal_type: string | null
          name: string
          source: string | null
          steps: string[] | null
          tags: string[] | null
          time: number | null
          user_id: string | null
        }
        Insert: {
          created?: string | null
          cuisine?: string | null
          description?: string | null
          dish_type?: string | null
          id?: string
          image?: string | null
          is_draft?: boolean | null
          meal_type?: string | null
          name: string
          source?: string | null
          steps?: string[] | null
          tags?: string[] | null
          time?: number | null
          user_id?: string | null
        }
        Update: {
          created?: string | null
          cuisine?: string | null
          description?: string | null
          dish_type?: string | null
          id?: string
          image?: string | null
          is_draft?: boolean | null
          meal_type?: string | null
          name?: string
          source?: string | null
          steps?: string[] | null
          tags?: string[] | null
          time?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_recipes_user_id_users"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created: string | null
          id: string
          rating: number | null
          recipe_id: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created?: string | null
          id?: string
          rating?: number | null
          recipe_id?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created?: string | null
          id?: string
          rating?: number | null
          recipe_id?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          _password_hash: string | null
          created: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          username: string
        }
        Insert: {
          _password_hash?: string | null
          created?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          username: string
        }
        Update: {
          _password_hash?: string | null
          created?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
