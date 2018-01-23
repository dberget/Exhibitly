class PresentationLink < ApplicationRecord
    require 'securerandom'
    belongs_to :presentation
    before_create :generate_link
    # default_scope :all, -> { self.all_account_links(account_id) }

    def generate_link
      self.share_id = SecureRandom.urlsafe_base64(4)
    end

    def self.all_account_links(account_id)
      PresentationLink
        .select('presentation_links.id, presentation_links.share_id, presentations.name')
        .joins(:presentation)
        .where('presentations.account_id = ?', account_id)
    end

end