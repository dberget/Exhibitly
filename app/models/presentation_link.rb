class PresentationLink < ApplicationRecord
    require 'securerandom'
    belongs_to :presentation
    before_create :generate_link

    def generate_link
      self.share_id = SecureRandom.urlsafe_base64(4)
    end
end