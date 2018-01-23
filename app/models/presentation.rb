class Presentation < ApplicationRecord
  belongs_to :account
  has_many :presentation_samples 
  has_many :samples, through: :presentation_samples
  has_many :presentation_links

  accepts_nested_attributes_for :presentation_samples

  scope :by_account, ->(account_id) { where(account_id: account_id) }
end
