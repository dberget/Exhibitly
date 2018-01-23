class PresentationLink < ApplicationRecord
    require 'securerandom'
    belongs_to :presentation
    before_create :generate_link

    def generate_link
      self.share_id = SecureRandom.urlsafe_base64(4)
    end

    def self.all_account_links(account_id)
      self.joins(:presentation).merge(Presentation.by_account(account_id))
    end
end