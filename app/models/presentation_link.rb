class PresentationLink < ApplicationRecord
    require 'securerandom'
    belongs_to :presentation
    before_create :generate_share_id, :url_encode_company
    
    def self.all_account_links(account_id)
      self.joins(:presentation).merge(Presentation.by_account(account_id))
    end


    def self.expiration_date_valid?(link) 
      link.expiration_date < Date.today 
    end

    private

    def generate_share_id
      loop do
        self.share_id = SecureRandom.urlsafe_base64(5)
        break unless PresentationLink.where(share_id: share_id).exists?
      end
    end

    def url_encode_company
      if self.company.present?
        self.company = self.company.split.map(&:capitalize)*"" 
      else 
        self.company = "presentation"
      end
  end
end