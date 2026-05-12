export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

type Timestamp = string;
type DateOnly = string;
type UUID = string;

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      languages: Table<{
        code: string;
        name: string;
        native_name: string;
        dir: "ltr" | "rtl";
        is_enabled: boolean;
        sort_order: number;
        created_at: Timestamp;
      }>;
      countries: Table<{
        id: UUID;
        fifa_code: string | null;
        iso2: string | null;
        emoji: string | null;
        created_at: Timestamp;
      }>;
      country_translations: Table<{
        country_id: UUID;
        language_code: string;
        name: string;
      }>;
      teams: Table<{
        id: UUID;
        country_id: UUID | null;
        fifa_code: string | null;
        flag_emoji: string | null;
        created_at: Timestamp;
      }>;
      team_translations: Table<{
        team_id: UUID;
        language_code: string;
        name: string;
        short_name: string | null;
      }>;
      host_cities: Table<{
        id: UUID;
        country_id: UUID | null;
        timezone: string;
        latitude: number | null;
        longitude: number | null;
        created_at: Timestamp;
      }>;
      host_city_translations: Table<{
        city_id: UUID;
        language_code: string;
        name: string;
        state_region: string | null;
        slug: string;
        summary: string | null;
        seo_title: string | null;
        seo_description: string | null;
      }>;
      stadiums: Table<{
        id: UUID;
        city_id: UUID;
        latitude: number | null;
        longitude: number | null;
        capacity: number | null;
        timezone: string;
        website_url: string | null;
        image_url: string | null;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      stadium_translations: Table<{
        stadium_id: UUID;
        language_code: string;
        name: string;
        slug: string;
        description: string | null;
        address: string | null;
        gate_info: string | null;
        parking_info: string | null;
        prohibited_items: string | null;
        seo_title: string | null;
        seo_description: string | null;
      }>;
      tournaments: Table<{
        id: UUID;
        name: string;
        year: number;
        starts_on: DateOnly | null;
        ends_on: DateOnly | null;
        created_at: Timestamp;
      }>;
      matches: Table<{
        id: UUID;
        tournament_id: UUID;
        stage: string;
        group_name: string | null;
        home_team_id: UUID | null;
        away_team_id: UUID | null;
        stadium_id: UUID | null;
        kickoff_at: Timestamp;
        status: "scheduled" | "live" | "finished" | "postponed" | "cancelled";
        home_score: number | null;
        away_score: number | null;
        external_id: string | null;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      match_translations: Table<{
        match_id: UUID;
        language_code: string;
        title: string | null;
        preview: string | null;
        broadcast_note: string | null;
      }>;
      places: Table<{
        id: UUID;
        city_id: UUID;
        stadium_id: UUID | null;
        type: "fan_zone" | "sports_bar" | "restaurant" | "parking" | "hotel" | "airport" | "transport_hub" | "attraction";
        latitude: number | null;
        longitude: number | null;
        website_url: string | null;
        phone: string | null;
        price_level: number | null;
        rating: number | null;
        image_url: string | null;
        is_sponsored: boolean;
        is_published: boolean;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      place_translations: Table<{
        place_id: UUID;
        language_code: string;
        name: string;
        slug: string;
        description: string | null;
        address: string | null;
        atmosphere: string | null;
        opening_hours_note: string | null;
        seo_title: string | null;
        seo_description: string | null;
      }>;
      tags: Table<{
        id: UUID;
        key: string;
        category: string | null;
        created_at: Timestamp;
      }>;
      tag_translations: Table<{
        tag_id: UUID;
        language_code: string;
        label: string;
      }>;
      place_tags: Table<{
        place_id: UUID;
        tag_id: UUID;
      }>;
      place_match_screenings: Table<{
        id: UUID;
        place_id: UUID;
        match_id: UUID;
        starts_at: Timestamp | null;
        reservation_url: string | null;
        is_official: boolean;
        created_at: Timestamp;
      }>;
      articles: Table<{
        id: UUID;
        type: "news" | "guide" | "city_page" | "stadium_page" | "watch_page";
        city_id: UUID | null;
        stadium_id: UUID | null;
        match_id: UUID | null;
        author_id: UUID | null;
        status: "draft" | "published" | "archived";
        category: string | null;
        image_url: string | null;
        source_url: string | null;
        published_at: Timestamp | null;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      article_translations: Table<{
        article_id: UUID;
        language_code: string;
        slug: string;
        title: string;
        excerpt: string | null;
        body: string | null;
        seo_title: string | null;
        seo_description: string | null;
      }>;
      route_templates: Table<{
        id: UUID;
        city_id: UUID;
        origin_place_id: UUID | null;
        destination_place_id: UUID | null;
        destination_stadium_id: UUID | null;
        transport_mode: "public_transport" | "driving" | "walking" | "taxi" | "shuttle";
        distance_meters: number | null;
        duration_seconds: number | null;
        provider: string | null;
        external_id: string | null;
        is_published: boolean;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      route_template_translations: Table<{
        route_template_id: UUID;
        language_code: string;
        title: string;
        summary: string | null;
        instructions: string | null;
      }>;
      route_alerts: Table<{
        id: UUID;
        city_id: UUID;
        stadium_id: UUID | null;
        severity: "info" | "warning" | "critical";
        starts_at: Timestamp | null;
        ends_at: Timestamp | null;
        is_published: boolean;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      route_alert_translations: Table<{
        alert_id: UUID;
        language_code: string;
        title: string;
        body: string;
      }>;
      profiles: Table<{
        id: UUID;
        display_name: string | null;
        avatar_url: string | null;
        language_code: string | null;
        country_id: UUID | null;
        favorite_team_id: UUID | null;
        telegram_user_id: number | null;
        premium_until: Timestamp | null;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      user_favorites: Table<{
        user_id: UUID;
        entity_type: "match" | "stadium" | "place" | "team" | "article" | "meetup";
        entity_id: UUID;
        created_at: Timestamp;
      }>;
      itinerary_items: Table<{
        id: UUID;
        user_id: UUID;
        match_id: UUID | null;
        place_id: UUID | null;
        stadium_id: UUID | null;
        starts_at: Timestamp | null;
        ends_at: Timestamp | null;
        note: string | null;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
      user_tickets: Table<{
        id: UUID;
        user_id: UUID;
        match_id: UUID;
        provider: string | null;
        section: string | null;
        seat_label: string | null;
        ticket_url: string | null;
        created_at: Timestamp;
        updated_at: Timestamp;
      }>;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"]) | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends { Row: infer R }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends { Row: infer R }
      ? R
      : never
    : never;

export type TablesInsert<TableName extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][TableName]["Insert"];
export type TablesUpdate<TableName extends keyof DefaultSchema["Tables"]> = DefaultSchema["Tables"][TableName]["Update"];
export type Enums<EnumName extends keyof DefaultSchema["Enums"]> = DefaultSchema["Enums"][EnumName];
export type CompositeTypes<CompositeTypeName extends keyof DefaultSchema["CompositeTypes"]> = DefaultSchema["CompositeTypes"][CompositeTypeName];

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
