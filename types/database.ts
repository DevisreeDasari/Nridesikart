export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_id: string
          full_name: string
          email: string
          phone: string
          address_line_1: string
          address_line_2?: string
          city: string
          state: string
          country: string
          pin_code: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          full_name: string
          email: string
          phone: string
          address_line_1: string
          address_line_2?: string
          city: string
          state: string
          country: string
          pin_code: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          full_name?: string
          email?: string
          phone?: string
          address_line_1?: string
          address_line_2?: string
          city?: string
          state?: string
          country?: string
          pin_code?: string
          updated_at?: string
        }
      }
      shops: {
        Row: {
          id: string
          owner_name: string
          manager_name: string
          shop_name: string
          phone: string
          business_doc_url: string
          address_line_1: string
          address_line_2?: string
          city: string
          state: string
          country: string
          pin_code: string
          status: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_name: string
          manager_name: string
          shop_name: string
          phone: string
          business_doc_url: string
          address_line_1: string
          address_line_2?: string
          city: string
          state: string
          country: string
          pin_code: string
          status?: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_name?: string
          manager_name?: string
          shop_name?: string
          phone?: string
          business_doc_url?: string
          address_line_1?: string
          address_line_2?: string
          city?: string
          state?: string
          country?: string
          pin_code?: string
          status?: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          updated_at?: string
        }
      }
      agents: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          id_proof_url: string
          photo_url: string
          status: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          id_proof_url: string
          photo_url: string
          status?: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          id_proof_url?: string
          photo_url?: string
          status?: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          updated_at?: string
        }
      }
      shoppers: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          id_proof_url: string
          photo_url: string
          status: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          id_proof_url: string
          photo_url: string
          status?: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          id_proof_url?: string
          photo_url?: string
          status?: 'pending_approval' | 'active' | 'rejected' | 'info_requested'
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          discount_price?: number
          category: string
          sub_category: string
          brand?: string
          images: string[]
          rating: number
          review_count: number
          stock: number
          shop_id: string
          status: 'active' | 'inactive' | 'out_of_stock'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          discount_price?: number
          category: string
          sub_category: string
          brand?: string
          images: string[]
          rating?: number
          review_count?: number
          stock: number
          shop_id: string
          status?: 'active' | 'inactive' | 'out_of_stock'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          discount_price?: number
          category?: string
          sub_category?: string
          brand?: string
          images?: string[]
          rating?: number
          review_count?: number
          stock?: number
          shop_id?: string
          status?: 'active' | 'inactive' | 'out_of_stock'
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description?: string
          image_url?: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          image_url?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          image_url?: string
          sort_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
      sub_categories: {
        Row: {
          id: string
          name: string
          slug: string
          category_id: string
          description?: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category_id: string
          description?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          category_id?: string
          description?: string
          sort_order?: number
          is_active?: boolean
          updated_at?: string
        }
      }
    }
  }
}
